import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'email пользователя'})
    readonly email: string;
    @ApiProperty({example: '1234567', description: 'Пароль пользователя'})
    readonly password: string;
    @ApiProperty({example: 'Хитрый лис', description: 'Имя пользователя'})
    readonly name: string;
    @ApiProperty({example: 'myAvatar.jpg', description: 'Аватар пользователя'})
    readonly avatar: string;
}