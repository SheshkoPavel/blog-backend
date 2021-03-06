import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {AddPostDto} from "./dto/add-post.dto";

@ApiTags('Доступные запросы для Пользователей')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {  }


    @Post('/one')
    getUserByName(@Body() {email}: {email: string}){
        return this.usersService.getUserByName(email);
    }

/*    Этот запрос реализован в регистрации пользователя
    @ApiOperation({summary: 'Добавление пользователя'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }*/



    @ApiOperation({summary: 'Получение всех пользователей из БД'})
    @ApiResponse({status: 200, type: [User]})
 //  @UseGuards(JwtAuthGuard)  Ограничение доступа к эндпоинту с помощью Guard
/*    @Roles('AUTHOR')          Ограничение к эндпоинту, если нет определенноё роли
    @UseGuards(RolesGuard)*/
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }



    @ApiOperation({summary: 'Выдать роль', description: 'Назначение роли для пользователя'})
    @ApiResponse({status: 200, type: AddRoleDto})
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Сделать пользователя соавтором', description: 'Добавляем id поста для пользователя'})
    @ApiResponse({status: 200, type: AddPostDto})
    @Post('/post')
    addPostToUser(@Body() dto: AddPostDto) {
        return this.usersService.addPost(dto);
    }


}
