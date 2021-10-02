import { Injectable } from '@nestjs/common';
import Todo = require('../model/schemas/Todo'); 

@Injectable()
export class AppService {
  // constructor(
  //   private readonly todo: Todo, // TODO fix it ????
  //   private readonly regexp: ReqExp, // ??????
  // ) {}


  async getTodos(req) {
    const { search, sortBy, sortByDesc, limit = 10, page = 1 } = req.query;
    const regexp = new RegExp(search, 'i');

    const searchQuery = {
      $or: [
        { 'title': { '$regex': regexp } },
        { 'description': { '$regex': regexp } },
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

      const modifiedTodos = todos.map((todo) => this.changeIdKey(todo));

      return {
        data: { todos: modifiedTodos, total, limit: newLimit, page: newPage },
      };
    } catch (error) {
      return { error };
    }
  }

  async getTodoById(contactId) {
    try {
      const todo = await Todo.findOne({ _id: contactId });
      return {
        data: this.changeIdKey(todo),
      };
    } catch (error) {
      return { error };
    }
  }

  async addTodo(data) {
    try {
      const addedTodo = await Todo.create({ ready: false, ...data });
      return {
        data: this.changeIdKey(addedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  async updateTodoById(contactId, data) {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: contactId },
        data,
        { new: true }
      );
      return {
        data: this.changeIdKey(updatedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  async removeTodoById(contactId) {
    try {
      const deletedTodo = await Todo.findOneAndDelete({ _id: contactId });
      return {
        data: this.changeIdKey(deletedTodo),
      };
    } catch (error) {
      return { error };
    }
  }

  // TODO: understand why doesn't work { _id, ...rest } = todo;
  private changeIdKey(todo) {
    const { _id, title, description, ready, createdAt, updatedAt } = todo;
    return { id: _id, title, description, ready, createdAt, updatedAt };
  }
}
