import {ApiProperty} from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty({example: '3', description: 'ID поста для изменения' })
    readonly updateId: number;
    @ApiProperty({example: 'В Египте выпал снег', description: 'Новый текст для заголовка поста' })
    newPostTitle: string;
    @ApiProperty({example: 'В августе месяце случилось чудо...', description: 'Новый текст для поста' })
    newPostContent: string;
    @ApiProperty({example: 'PUBLISHED', description: 'Новый статус поста' })
    newPostStatus: string;
}

export class UpdatePostResponseDto {
    @ApiProperty({example: '1', description: 'Код ответа', })
    readonly responseCode: number;
    @ApiProperty({example: 'Пост с ID 28 был изменён', description: 'Сообщение о изменении' })
    readonly message: string;
}

export class AddTagToPostDto {
    @ApiProperty({example: 'ЗЕМЛЯ', description: 'Добавленный тег' })
    readonly tag: string;
    @ApiProperty({example: '1', description: 'id Статьи, которой был добавлен новый тег' })
    readonly postId: number;
}



