import {Body, Controller, Post, UploadedFile} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Доступные запросы для Статей блога')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
        return this.postService.create(dto, image);
    }

}
