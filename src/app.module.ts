import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { CommentsModule } from './comments/comments.module';
import * as path from 'path'
import {Comment} from "./comments/comments.model";
import { TagsModule } from './tags/tags.module';
import {Tag} from "./tags/tags.model";
import {PostTags} from "./tags/post-tag.model";
import {UserPosts} from "./posts/user-posts.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`  //Отслеживание режима пользователь/разработчик
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static' ),
        }),
        SequelizeModule.forRoot({   //Найстройка Type ORM Sequelize
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, Comment, Tag, PostTags, UserPosts],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        CommentsModule,
        TagsModule,
    ]
})
export class AppModule {}