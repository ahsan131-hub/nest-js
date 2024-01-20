import { UsersService } from './users.service';
import {CreateUserDto, createUserSchema} from "./users.dto";
import {ZodValidationPipe} from "../validations/zod.validation";
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes} from '@nestjs/common';

@Controller("/users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("/")
    get(): string[] {
        return this.userService.get();
    }

    @Post("/")
    @UsePipes(new ZodValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDto):string{
        return this.userService.create(createUserDto);
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
