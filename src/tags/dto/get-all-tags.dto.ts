import {ApiProperty} from "@nestjs/swagger";

export class GetAllTagsResponseDto {
    @ApiProperty({example: '1', description: 'id созданного тега'})
    readonly id: number;
    @ApiProperty({example: 'НАУКА', description: 'Тег для статьи'})
    readonly tag: string;
    @ApiProperty({example: '2022-07-08T14:36:14.934Z', description: 'Дата создания тега'})
    readonly createdAt: string;
    @ApiProperty({example: '2022-07-08T14:36:14.934Z', description: 'Дата изменения тега'})
    readonly updatedAt: string;
}