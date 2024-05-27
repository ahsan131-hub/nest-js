import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './users.dto';
import { ZodValidationPipe } from '../validations/zod.validation';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from '../models/user.models';
import { ICreateUser } from './user';
import { UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import translateMessage from 'src/helpers/translate-message';
import { AccessTokenGuard } from 'src/gaurds/access-token.gaurds';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /*-----------------------GET------------------------ */
  @Get('/')
  async get(): Promise<ApiResponse<User[]>> {
    try {
      const data: User[] = await this.userService.findAll();
      return {
        status: 200,
        message: translateMessage('messages', 'created', {
          attr: 'User',
          action: 'created',
        }),
        data: data,
      };
    } catch (e) {
      console.log('Error :', e.message);
      return {
        status: 400,
        message: translateMessage('errors', 'fetchFailed', {
          attr: 'User',
        }),
      };
    }
  }

  /*-----------------------POST------------------------ */
  @Post('/')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<undefined>> {
    try {
      const user: ICreateUser = await this.userService.create(createUserDto);
      if (user._id) {
        return {
          message: 'Successfully created user.',
          status: 200,
        };
      }
    } catch (e) {
      console.log('Error :', e.message);
      return {
        status: 400,
        message: `Error :${e.message}`,
      };
    }
  }

  /*-----------------------UPDATE------------------------ */
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Omit<CreateUserDto, 'password'>,
  ): Promise<ApiResponse<undefined>> {
    try {
      const user: UpdateWriteOpResult = await this.userService.update(
        id,
        updateUserDto,
      );
      if (user.acknowledged) {
        return {
          status: 200,
          message: 'Successfully update user',
        };
      }
    } catch (e) {
      console.log('Error :', e.message);
      return {
        status: 400,
        message: `Error :${e.message}`,
      };
    }
  }

  /*-----------------------DELETE------------------------ */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
