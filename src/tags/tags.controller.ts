import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TagsService} from "./tags.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {Tag} from "./tags.model";
import {GetAllTagsResponseDto} from "./dto/get-all-tags.dto";

@ApiTags('Доступные запросы к таблице тегов')
@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService) {
    }

    @ApiOperation({summary: 'Добавление нового тега'})
    @ApiResponse({status: 201, type: GetAllTagsResponseDto})
    @Post()
    create(@Body() dto: CreateTagDto){
        return this.tagsService.createTag(dto);
    }

    @ApiOperation({summary: 'Получить все доступные теги'})
    @ApiResponse({status: 200, type: [Tag]})
    @Get()
    getAll() {
        return this.tagsService.getAllTags();
    }

    @ApiOperation({summary: 'Получить информацию о теге по его значению'})
    @ApiResponse({status: 200, type: GetAllTagsResponseDto})
    @Get('/:tag')
    getByValue(@Param('tag') value: string ) {
        return this.tagsService.getTagByValue(value);
    }


}
