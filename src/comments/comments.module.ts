import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "../posts/posts.model";
import {Comment} from "./comments.model";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
      SequelizeModule.forFeature([Post, Comment]),
  ]
})
export class CommentsModule {}
