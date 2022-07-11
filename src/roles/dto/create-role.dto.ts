import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'AUTHOR', description: 'Строковое значение новой роли' })
    readonly value: string;
    @ApiProperty({example: 'Автор может добавлять новые статьи', description: 'Описание роли' })
    readonly description: string;
}