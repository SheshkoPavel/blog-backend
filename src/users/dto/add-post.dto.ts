import {ApiProperty} from "@nestjs/swagger";

export class AddPostDto {
    @ApiProperty({example: '5', description: 'id поста, к которому будет получен доступ для соавторства'})
    readonly postId: number;
    @ApiProperty({example: '1', description: 'id пользователя, которому присваивается Пост'})
    readonly userId: number;
}