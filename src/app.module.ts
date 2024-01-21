import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module";
import {MiddlewareConsumer, Module} from '@nestjs/common';
import {LoggerMiddleware} from "./middlewares/logging,middleware";
import {SequelizeModule} from "@nestjs/sequelize";
import { User } from './models/user.models';

@Module({
  imports: [ConfigModule.forRoot(),SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'ahsan131',
    database: 'nestjs_db',
    models: [User],
  }),UsersModule],
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
