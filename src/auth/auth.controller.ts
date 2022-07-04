import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags('Авторизация пользователя')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@Body() userDto: CreateUserDto, @UploadedFile() avatar) {
        return this.authService.registration(userDto, avatar);
    }

}
