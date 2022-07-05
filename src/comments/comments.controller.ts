import {Body, Controller, Post} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./comments.model";

@ApiTags('Доступные запросы для комментариев')
@Controller('comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {}

    @ApiOperation({summary: 'Добавление комментария'})
    @ApiResponse({status: 201, type: Comment})
    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentService.createComment(dto);
    }


}
