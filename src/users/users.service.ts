import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./users.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../models/user.models";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async create(creatUserDto:CreateUserDto):Promise<string>{
        await this.userModel.create({
            firstName:creatUserDto.firstName,
            lastName:creatUserDto.lastName,
            isActive:true
        })
        return "user is successfully is created!"
    }
    update(id:number):string{
        return "user is successfully is updated!"
    }

    remove(id:number):string{
        return "user is successfully is removed!"
    }
}
