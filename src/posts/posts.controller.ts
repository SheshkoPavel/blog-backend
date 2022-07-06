import {Body, Controller, Get, HttpStatus, Patch, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdatePostDto, UpdatePostResponseDto} from "./dto/update-post.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "../users/dto/add-role.dto";
import {AddTagDto} from "../roles/dto/add-tag.dto";
import {PostsGetAllResponse} from "./responses/posts.getAll-response";


@ApiTags('Доступные запросы для Статей блога')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

//    @UseGuards(JwtAuthGuard) // Ограничение доступа к эндпоинту с помощью Guard
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
        return this.postService.create(dto, image);
    }

    @ApiOperation({summary: 'Получение всех опубликованных постов из БД'})
    @ApiResponse({status: 200, type: PostsGetAllResponse})
    @Get('all')
    getAll(){
        return this.postService.getAllPosts();
    }

    @ApiOperation({summary: 'Получение всех опубликованных постов из БД'})
    @ApiResponse({status: 200, type: [Post]})
    @Get()
    getAllPublished(){
        return this.postService.getAllPublishedPosts();
    }

    @ApiOperation({summary: 'Изменение статьи по id', description: 'В ответе вы получите responseCode и сообщение'})
    @ApiResponse({status: HttpStatus.OK, type: UpdatePostResponseDto})
//    @UseGuards(JwtAuthGuard)
    @Patch()
    async updatePost(@Body() updatePostDto: UpdatePostDto): Promise<UpdatePostResponseDto>{
        const [updateResponseCode] = await this.postService.updatePost(updatePostDto);
        if(updateResponseCode === 0){
            return {
                responseCode: updateResponseCode,
                message: "Что-то пошло не так, ошибка выполнения операции"
            }
        }
        return {
            responseCode: updateResponseCode,
            message: `Пост с ID ${updatePostDto.updateId} был изменён`
        }
    }

    @ApiOperation({summary: 'Выдать тег'})
    @ApiResponse({status: 200})
    @Post('/tag')
    addTag(@Body() dto: AddTagDto){
        return this.postService.addTag(dto);
    }

}
