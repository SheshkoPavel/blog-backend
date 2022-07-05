import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({example: 'Skywalker', description: 'Имя автора комментария'})
    readonly author: string;
    @ApiProperty({example: 'Отличная статья!', description: 'Текст комментария'})
    readonly text: string;
    @ApiProperty({example: '1', description: 'id статьи'})
    readonly postId: number;
}