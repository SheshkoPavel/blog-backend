import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'email пользователя'})
    readonly email: string;
    @ApiProperty({example: '1234567', description: 'Пароль пользователя'})
    readonly password: string;
}

export class LoginResponseDto {
    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld1VzZXIxQG1haWwucnUiLCJpZCI6MS',
        description: 'Токен пользователя'})
    readonly token: string;
}