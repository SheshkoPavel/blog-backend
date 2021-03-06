import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import {FilesService} from "../files/files.service";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private fileService: FilesService) {}

    async login(userDto: LoginUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (!candidate) {
            throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND)
        }
        const user = await this.validateUser(userDto);
        return this.generateToken(user);  //Если валидация прошла успешно, генерируем JWT токен юзера
    }

    async registration(userDto: CreateUserDto, avatar: any) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (!!candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5); //Хэшируем пароль
        const fileName = await this.fileService.createFileAvatar(avatar);
        const user = await this.usersService.createUser({...userDto, password: hashPassword, avatar: fileName});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles, name: user.name, avatar: user.avatar}; //Какие поля буду ложить в токен
        return {
            token: this.jwtService.sign(payload)    //Генерация JWT токена
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);  //Сравниваем пароль, который пришёл с клиента с паролем из БД
        if (!!user && !!passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Введён неправильный email или пароль'});

    }
}
