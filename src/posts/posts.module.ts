import {forwardRef, Module} from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";
import {Comment} from "../comments/comments.model";
import {PostTags} from "../tags/post-tag.model";
import {Tag} from "../tags/tags.model";
import {TagsModule} from "../tags/tags.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment, Tag, PostTags]),
    FilesModule,
    TagsModule,
    forwardRef(() => AuthModule)
  ]
})
export class PostsModule {}
