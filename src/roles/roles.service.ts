import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.rolesRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.rolesRepository.findOne({
            where: {
                value: value
            }
        });
        return role;
    }
}
