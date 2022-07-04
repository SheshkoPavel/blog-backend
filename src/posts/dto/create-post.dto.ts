import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'В Бразилии высадились пришельцы', description: 'Заголовок статьи', })
    readonly title: string;
    @ApiProperty({example: 'Зёленые человечки в большими глазами высадились у побережья Бразилии', description: 'Текст статьи', })
    readonly content: string;
    @ApiProperty({example: '3', description: 'Id автора статьи', })
    readonly userId: number;
}