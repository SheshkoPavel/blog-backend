import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'В Бразилии высадились пришельцы', description: 'Заголовок статьи'})
    readonly title: string;
    @ApiProperty({example: 'Зёленые человечки в большими глазами высадились у побережья Бразилии', description: 'Текст статьи'})
    readonly content: string;
    @ApiProperty({example: '3', description: 'Id автора статьи'})
    readonly userId: number;
    @ApiProperty({example: '61f799df-ad52-49dd-b965-df5427c43133.jpg', description: 'Изображение к посту в формате jpg'})
    readonly image: string;
}

export class CreatePostResponseDto {
    @ApiProperty({example: '1', description: 'id статьи'})
    readonly id: number;
    @ApiProperty({example: 'В Бразилии высадились пришельцы', description: 'Заголовок статьи'})
    readonly title: string;
    @ApiProperty({example: 'Зёленые человечки в большими глазами высадились у побережья Бразилии', description: 'Текст статьи'})
    readonly content: string;
    @ApiProperty({example: '3', description: 'Id автора статьи'})
    readonly userId: number;
    @ApiProperty({example: 'PUBLISHED', description: 'Статус статьи'})
    readonly status: string;
    @ApiProperty({example: '61f799df-ad52-49dd-b965-df5427c43133.jpg', description: 'Автоматически сгенерированое имя картинки'})
    readonly image: string;
    @ApiProperty({example: '2022-07-11T14:08:30.679Z', description: 'Дата создания Статьи'})
    readonly createdAt: string;
    @ApiProperty({example: '2022-07-11T14:08:30.679Z', description: 'Дата последнего редактирования Статьи'})
    readonly updatedAt: string;

}