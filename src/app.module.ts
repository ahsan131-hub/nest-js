import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {LoggerMiddleware} from "./middlewares/logging,middleware";


@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // used class based middleware.
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('/');
  }
}
