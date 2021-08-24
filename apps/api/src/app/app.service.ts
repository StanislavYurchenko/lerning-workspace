import { Injectable } from '@nestjs/common';
import { Message } from '@learning-workspace/api-interfaces';
import Todo = require('../model/schemas/Todo'); 
@Injectable()
export class AppService {
  // constructor(private readonly todo: Todo) { } // TODO fix it

  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  async getTodos(req) {
    const { sortBy, sortByDesc, select, limit = 5, page = 1 } = req.query;
    try {
      const {
        docs: todos,
        totalDocs: total,
        limit: newLimit,
        page: newPage,
      } = await Todo.paginate(
        {},
        {
          limit,
          page,
          sort: {
            ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
            ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
          },
          select: select ? select.split('|').join(' ') : '',
        }
      );

      return { data: { todos, total, limit: newLimit, page: newPage } };
    } catch (error) {
      return { error };
    }
  }

  async getTodoById(contactId) {
    try {
      return {
        data: await Todo.findOne({ _id: contactId }),
      };
    } catch (error) {
      return { error };
    }
  }

  async addTodo(data) {
    try {
      return {
        data: await Todo.create({ ready: false, ...data }),
      };
    } catch (error) {
      return { error };
    }
  }

  async updateTodoById(contactId, data) {
    try {
      return {
        data: await Todo.findOneAndUpdate({ _id: contactId }, data, {
          new: true,
        }),
      };
    } catch (error) {
      return { error };
    }
  }

  async removeTodoById(contactId) {
    try {
      return {
        data: await Todo.findOneAndDelete({ _id: contactId }),
      };
    } catch (error) {
      return { error };
    }
  }
}

