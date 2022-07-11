import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {GetRoleByValueResponseDto} from "./dto/get-role-by-value.dto";

@ApiTags('Доступные запросы для Ролей')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {   }

    @ApiOperation({summary: 'Создание новой Роли пользователя'})
    @ApiResponse({status: 201, type: GetRoleByValueResponseDto})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({summary: 'Получение информации о Роли'})
    @ApiResponse({status: 200, type: GetRoleByValueResponseDto})
    @Get('/:value')
    getByValue(@Param('value') value: string ) {
        return this.rolesService.getRoleByValue(value);
    }
}
