import {ApiProperty} from "@nestjs/swagger";

export class CreateTagDto {
    @ApiProperty({example: 'НАУКА', description: 'Тег для статьи'})
    readonly tag: string;
}