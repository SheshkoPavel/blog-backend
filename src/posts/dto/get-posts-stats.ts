import {ApiProperty} from "@nestjs/swagger";

export class GetPostsStatsResponseDto {
    @ApiProperty({example: '10', description: 'Число опубиликованных постов' })
    readonly publishedPostsCount: number;
    @ApiProperty({example: '3', description: 'Число постов в черновиках' })
    readonly savedPostsCount: number;
}