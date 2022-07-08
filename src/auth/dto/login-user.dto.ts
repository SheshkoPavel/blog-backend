import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'email пользователя'})
    readonly email: string;
    @ApiProperty({example: '1234567', description: 'Пароль пользователя'})
    readonly password: string;
}