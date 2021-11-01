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
import { RequestWithUser } from '../interfaces/request-with-user'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODOS
  @Get('todo')
  async getTodos(@Req() req: RequestWithUser) {
    return this.appService.getTodos(req, req.user?.id);
  }

  @Get('todo/:id')
  async getTodoById(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.getTodoById(id, req.user?.id);
  }

  @Post('todo')
  async addTodo(@Body() data, @Req() req: RequestWithUser) {
    return this.appService.addTodo(data, req.user?.id);
  }

  @Put('todo/:id')
  async updateTodoById(
    @Param('id') id: string,
    @Body() data,
    @Req() req: RequestWithUser,
  ) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.updateTodoById(id, data, req.user?.id);
  }

  @Delete('todo/:id')
  async removeTodoById(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.appService.removeTodoById(id, req.user?.id);
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
  async logout(@Body() id: string) {
    return this.appService.logout(id);
  }

  @Get('user/auth/verify/:token')
  async verify(@Param('token') token: string) {
    return this.appService.verify(token);
  }
}
