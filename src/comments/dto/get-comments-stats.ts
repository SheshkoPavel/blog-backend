import {ApiProperty} from "@nestjs/swagger";

export class GetCommentsStatsResponseDto {
    @ApiProperty({example: '10', description: 'Число комментариев за последник 24 часа' })
    readonly dailyCommentsCount: number;
}