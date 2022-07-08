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
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto, avatar: any) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (!!candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const fileName = await this.fileService.createFileAvatar(avatar);
        const user = await this.usersService.createUser({...userDto, password: hashPassword, avatar: fileName});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles, name: user.name, avatar: user.avatar};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquales = await bcrypt.compare(userDto.password, user.password);
        if (!!user && !!passwordEquales) {
            return user;
        }
        throw new UnauthorizedException({message: 'Введён неправильный email или пароль'});

    }
}
