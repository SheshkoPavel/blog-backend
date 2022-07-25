import { Injectable } from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.model";

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) { }

    async createComment(dto: CreateCommentDto) {
        const comment = await this.commentRepository.create(dto);
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


    async getCommentsStatistic() {
        const { Op } = require("sequelize");
        const now = new Date();
        const dayAgo = new Date(Date.now() - 86400000)
        const dailyCommentsCount = await this.commentRepository.count({
            col: 'id',
            where: {
                createdAt: {
                    [Op.lt]: now,
                    [Op.gt]: dayAgo
                }
            }
        });
        return {
            dailyCommentsCount: dailyCommentsCount
        }
    }
}
