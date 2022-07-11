import {ApiProperty} from "@nestjs/swagger";

export class AddTagDto {
    @ApiProperty({example: 'ЗЕМЛЯ', description: 'Добавляемый тег' })
    readonly tag: string;
    @ApiProperty({example: '1', description: 'id Статьи которой хотим добавить тег' })
    readonly postId: number;
}