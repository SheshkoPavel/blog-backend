import { Injectable } from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.model";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) { }

    createComment(dto: CreateCommentDto) {
        const comment = this.commentRepository.create(dto);
        return comment;
    }

    async getCommentsById(postId: number) {
        const post = await this.commentRepository.findAll({
            where: {
                postId: postId
            }
        });
        return post;
    }

}
