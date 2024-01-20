import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./users.dto";

@Injectable()
export class UsersService {
    get():string[]{
        return ["ahsan","ali"]
    }
    create(creatUserDto:CreateUserDto):string{
        console.log("-----service----",creatUserDto)
        return "user is successfully is created!"
    }
    update(id:number):string{
        return "user is successfully is updated!"
    }

    remove(id:number):string{
        return "user is successfully is removed!"
    }
}
