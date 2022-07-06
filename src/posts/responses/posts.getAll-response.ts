import {ApiProperty} from "@nestjs/swagger";

export class PostsGetAllResponse {
    @ApiProperty({example: '[ {}, {} ... ]', description: 'Массив объектов типа Пост', })
    posts: Array<object>;
    @ApiProperty({example: '3', description: 'Общее колличество Постов', })
    totalCount: number;
}