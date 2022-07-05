import {Body, Controller, Post} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Controller('comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {}

    @ApiOperation({summary: 'Добавление пользователя'})
    @ApiResponse({status: 201, type: Comment})
    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentService.createComment(dto);
    }


}
