import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto, CreatePostResponseDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {AddTagToPostDto, UpdatePostDto, UpdatePostResponseDto} from "./dto/update-post.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "../users/dto/add-role.dto";
import {AddTagDto} from "../roles/dto/add-tag.dto";
import {PostsGetAllResponse} from "./responses/posts.getAll-response";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {GetPostsStatsResponseDto} from "./dto/get-posts-stats";
import {Post as PostItem} from './posts.model'


@ApiTags('Доступные запросы для Статей блога')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Добавление Статьи'})
    @ApiResponse({status: 201, type: CreatePostResponseDto})
    @UseGuards(RolesGuard)
    @Roles("AUTHOR")         // Ограничение к эндпоинту, если нет определенноё роли
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
        return this.postService.create(dto, image);
    }

    @ApiOperation({summary: 'Получение всех постов из БД'})
    @ApiResponse({status: 200, type: PostsGetAllResponse})
    @Get('all')
    getAll( @Query() query: {limit: number, offset: number}){
        return this.postService.getAllPosts(query);
    }

    @ApiOperation({summary: 'Получение статистики о постах'})
    @ApiResponse({status: 200, type: GetPostsStatsResponseDto})
    @Get('/stats' )
    async getPostsStats(){
        return  await this.postService.getStatsForPosts()
    }

    @ApiOperation({summary: 'Получение всех опубликованных постов из БД'})
    @ApiResponse({status: 200, type: PostItem})
    @Get()
    getAllPublished(){
        return this.postService.getAllPublishedPosts();
    }

    @ApiOperation({summary: 'Получение всех постов одного пользователя'})
    @ApiResponse({status: 200, type: [PostItem]})
    @Get('/user/:userId')
    getAllUserPosts(@Param ('userId') userId: number ){
        return this.postService.getAllPostsByUserId(userId);
    }

    @ApiOperation({summary: 'Получение Одной статьи из БД'})
    @ApiResponse({status: 200, type: PostItem})
    @Get('/:id')
    getOnePostById(@Param('id') id: number ){
        return this.postService.getPostById(id);
    }

    @ApiOperation({summary: 'Изменение статьи по id',
        description: 'В ответе вы получите responseCode и сообщение'})
    @ApiResponse({status: HttpStatus.OK, type: UpdatePostResponseDto})
    @UseGuards(RolesGuard)
    @Roles("AUTHOR")
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
    @ApiResponse({status: 200, type: AddTagToPostDto})
    @Post('/tag')
    addTag(@Body() dto: AddTagDto){
        return this.postService.addTag(dto);
    }

}
