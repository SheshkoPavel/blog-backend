import {forwardRef, Module} from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
    forwardRef(() => AuthModule)
  ]
})
export class PostsModule {}
