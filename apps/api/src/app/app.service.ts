import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import jwt  = require('jsonwebtoken');
import dotenv = require('dotenv');

import Todo = require('../model/schemas/Todo');
import User = require('../model/schemas/User');
import { HTTP_CODE } from '../constants/constants';
import { EmailService } from './email.service';

dotenv.config();
const { JWT_SECRET } = process.env;

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}
  // TODOS
  public async getTodos(req, userId) {
    const { search, sortBy, sortByDesc, limit = 10, page = 1 } = req.query;
    const regexp = new RegExp(search, 'i');

    const searchQuery = {
      $and: [
        { owner: userId },
        {
          $or: [
            { title: { $regex: regexp } },
            { description: { $regex: regexp } },
          ],
        },
      ],
    };

    const paginateOptions = {
      limit: limit < 100 ? limit : 100,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
    };

    try {
      const {
        docs: todos,
        totalDocs: total,
        limit: newLimit,
        page: newPage,
      } = await Todo.paginate(searchQuery, paginateOptions);

      todos.forEach((todo) => this.todoResponse(todo));

      return {
        data: { todos, total, limit: newLimit, page: newPage },
      };
    } catch (error) {
      return { error };
    }
  }

  public async getTodoById(todoId, userId) {
    try {
      const todo = await Todo.findOne({ _id: todoId, owner: userId }).populate({
        path: 'owner',
        select: 'email -_id',
      });

      return {
        data: this.todoResponse(todo),
      };
    } catch (error) {
      return { error };
    }
  }

  public async addTodo(data, userId) {
    try {
      const addedTodo = await Todo.create({
        ready: false,
        owner: userId,
        ...data,
      });
      return {
        data: this.todoResponse(addedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  public async updateTodoById(todoId, data, userId) {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, owner: userId },
        data,
        { new: true }
      );

      return {
        data: this.todoResponse(updatedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  public async removeTodoById(contactId, userId) {
    try {
      const deletedTodo = await Todo.findOneAndDelete({
        _id: contactId,
        owner: userId,
      });
      
      return {
        data: this.todoResponse(deletedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  // USERS
  public async register(user) {
    const { email, name } = user;
    try {
      const { data } = await this.findUserByEmail(email);
      const isUserExist = Boolean(data);
      if (isUserExist) {
        const error = new Error();
        // error.code = HTTP_CODE.CONFLICT;
        error.message = `Email ${email} is already exist`;
        throw error;
      }
      const verifyToken = nanoid();
      await this.emailService.sendEmail(verifyToken, email, name);

      const newUser = await new User({
        ...user,
        verify: false,
        verifyToken,
      }).save();
      return { data: this.userResponse(newUser) };
    } catch (error) {
      return { error };
    }
  }

  public async login(data) {
    const { email, password } = data;
    try {
      const { data } = await this.findUserByEmail(email);
      const isValidPassword = data ? await data.validPassword(password) : false;

      if (!data || !isValidPassword || !data.verify) {
        const error = new Error();
        // error.code = HTTP_CODE.NOT_FOUND;
        error.message = data.verify
          ? 'User or password is incorrect'
          : 'Verify your email';
        throw error;
      }
      const payload = { _id: data._id };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '240h' });

      const { data: userData } = await this.updateToken(data._id, token);

      const user = userData ? this.userResponse(userData) : null;

      return { data: { ...user } };
    } catch (error) {
      return { error };
    }
  }

  public async logout(id) {
    try {
      const { data, error } = await this.findUserById(id);
      await this.updateToken(id, null);
      return { data: data && { message: 'Logout success' } };
    } catch (error) {
      return { error };
    }
  }

  public async verify(token) {
    try {
      const { data, error } = await this.findByVerifyToken(token);

      if (data) {
        await this.updateVerifyToken(data._id, true, null);

        const result = { message: 'Verification successful' };
        // const code = HTTP_CODE.OK;

        return { data: result };
      }

      const result = { message: 'Link is not valid' };
      // const code = HTTP_CODE.NOT_FOUND;

      return { data: result };
    } catch (error) {
      return { error };
    }
  }

  private async findUserByEmail(email) {
    try {
      return { data: await User.findOne({ email }) };
    } catch (error) {
      return { error };
    }
  }

  private async findByVerifyToken(verifyToken) {
    try {
      return { data: await User.findOne({ verifyToken }) };
    } catch (error) {
      return { error };
    }
  }

  public async findUserById(id) {
    try {
      return { data: await User.findById(id) };
    } catch (error) {
      return { error };
    }
  }

  private async updateVerifyToken(id, verify, verifyToken) {
    try {
      return {
        data: await User.findByIdAndUpdate(id, { verify, verifyToken }),
      };
    } catch (error) {
      return { error };
    }
  }

  private async updateToken(id, token) {
    try {
      return { data: await User.findByIdAndUpdate(id, { token }) };
    } catch (error) {
      return { error };
    }
  }

  // SHARED
  private todoResponse(todo) {
    const { _id, title, description, ready, createdAt, updatedAt } = todo;
    return {
      id: _id,
      title,
      description,
      ready,
      createdAt,
      updatedAt,
    };
  }

  private userResponse(user) {
    const {
      _id,
      token,
      verify,
      email,
      password,
      name,
      verifyToken,
      createdAt,
      updatedAt,
    } = user;
    return {
      id: _id,
      token,
      verify,
      email,
      password,
      name,
      verifyToken,
      createdAt,
      updatedAt,
    };
  }
}
