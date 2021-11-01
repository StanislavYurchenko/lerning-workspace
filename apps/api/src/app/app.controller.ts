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

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODOS
  @Get('todo')
  async getTodos(@Req() req: Request) {
    return this.appService.getTodos(req, '617d4d1bc26476138e81766d');
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string, @Req() req: Request) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.getTodoById(id, '617d4d1bc26476138e81766d');
  }

  @Post('todo')
  async addTodo(@Body() data, @Req() req: Request) {
    return this.appService.addTodo(data, '617d4d1bc26476138e81766d');
  }

  @Put('todo/:id')
  async updateTodoById(@Param('id') id: string, @Body() data, @Req() req: Request) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.updateTodoById(id, data, '617d4d1bc26476138e81766d');
  }

  @Delete('todo/:id')
  async removeTodoById(@Param('id') id: string, @Req() req: Request) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.removeTodoById(id, '617d4d1bc26476138e81766d');
  }

  // USERS
  @Post('user/register')
  async register(@Body() data) {
    return this.appService.register(data);
  }

  @Post('user/login')
  async login(@Body() data) {
    return this.appService.login(data);
  }

  @Post('user/logout')
  async logout(@Body() id) {
    return this.appService.logout(id);
  }

  @Get('user/auth/verify/:token')
  async verify(@Param('token') token: string) {
    return this.appService.verify(token);
  }
}
