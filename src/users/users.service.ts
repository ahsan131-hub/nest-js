import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.models';
import { Model, UpdateWriteOpResult } from 'mongoose';
import * as argon2 from 'argon2';
import { DeleteResult } from 'mongodb';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({
      email: email,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UpdateWriteOpResult | any> {
    const hash = await this.hashData(createUserDto.password);
    return await this.userModel.create({
      ...createUserDto,
      password: hash,
    });
  }
  async update(
    id: string,
    updateUserDto: Omit<CreateUserDto, 'password'>,
  ): Promise<UpdateWriteOpResult> {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userModel.deleteOne({ _id: id });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
