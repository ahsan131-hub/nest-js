import { UsersService } from './users.service';
import {CreateUserDto, createUserSchema} from "./users.dto";
import {ZodValidationPipe} from "../validations/zod.validation";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes} from '@nestjs/common';
import {User} from "../models/user.models";

@Controller("/users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("/")
    async get(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post("/")
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async create(@Body() createUserDto: CreateUserDto): Promise<string> {
        return await this.userService.create(createUserDto);
    }

    @Put(":id")
    update(@Param("id",new ParseIntPipe()) id:number):string{
        return this.userService.update(id)
    }

    @Delete(":id")
    remove(@Param("id",new ParseIntPipe()) id:number):string{
        return this.userService.remove(id)
    }


}
