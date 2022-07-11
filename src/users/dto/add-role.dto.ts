import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'AUTHOR', description: 'Уникальное значение роли'})
    readonly value: string;
    @ApiProperty({example: '1', description: 'id пользователя, которому присваивается роль'})
    readonly userId: number;
}