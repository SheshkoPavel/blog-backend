import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TagsService} from "./tags.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {Tag} from "./tags.model";
import {AddRoleDto} from "../users/dto/add-role.dto";

@ApiTags('Доступные запросы к таблице тегов')
@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService) {
    }

    @ApiOperation({summary: 'Добавление нового тега'})
    @ApiResponse({status: 201, type: Tag})
    @Post()
    create(@Body() dto: CreateTagDto){
        return this.tagsService.createTag(dto);
    }


    @Get()
    getAll() {
        return this.tagsService.getAllTags();
    }

    @Get('/:tag')
    getByValue(@Param('tag') value: string ) {
        return this.tagsService.getTagByValue(value);
    }


}
