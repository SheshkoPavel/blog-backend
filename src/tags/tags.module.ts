import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "../posts/posts.model";
import {Tag} from "./tags.model";
import {PostTags} from "./post-tag.model";

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
      SequelizeModule.forFeature([Tag, Post, PostTags]),
  ],
    exports: [TagsService]
})
export class TagsModule {}
