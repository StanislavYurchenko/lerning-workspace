import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthorizationMiddleware } from './auth.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes('todo');
  }
}
