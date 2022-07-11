import {ApiProperty} from "@nestjs/swagger";

export class GetRoleByValueResponseDto {
    @ApiProperty({example: '1', description: 'id данной роли в БД' })
    readonly id: number;
    @ApiProperty({example: 'AUTHOR', description: 'Строковое значение новой роли' })
    readonly value: string;
    @ApiProperty({example: 'Автор статей', description: 'Описание роли' })
    readonly description: string;
    @ApiProperty({example: '2022-07-08T14:32:12.809Z', description: 'Строка типа Date, с указанием даты и времени создания поста' })
    readonly createdAt: string;
    @ApiProperty({example: '2022-07-09T14:32:12.809Z', description: 'Строка типа Date, с указанием даты и времени изменения поста'  })
    readonly updatedAt: string;
}