import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
  NotFoundException,
} from '@nestjs/common';

import { Message } from '@learning-workspace/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('todos')
  async getTodos(@Req() req: Request) {
    return this.appService.getTodos(req);
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.getTodoById(id);
  }

  @Post('todo')
  async addTodo(@Body() data) {
    return this.appService.addTodo(data);
  }

  @Delete('todo/:id')
  async removeTodo(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.removeTodo(id);
  }

  @Put('todo/:id')
  async updateTodo(@Param('id') id: string, @Body() data) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.updateTodo(id, data);
  }
}
