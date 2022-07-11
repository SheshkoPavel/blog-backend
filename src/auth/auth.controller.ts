import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {LoginResponseDto, LoginUserDto} from "./dto/login-user.dto";


@ApiTags('Авторизация пользователя')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiResponse({status: 201, type: LoginResponseDto})
    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, type: LoginResponseDto})
    @Post('/registration')
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@Body() userDto: CreateUserDto, @UploadedFile() avatar) {
        return this.authService.registration(userDto, avatar);
    }

}
