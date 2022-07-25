import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {AddPostDto} from "./dto/add-post.dto";
import {PostsService} from "../posts/posts.service";
import sequelize, {Op} from "sequelize";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService,
                private postsService: PostsService
                ) {  }

    async createUser(dto: CreateUserDto) {
        const user =  await this.userRepository.create(dto);
        let role = await this.rolesService.getRoleByValue("AUTHOR"); //Роль по умолчанию
        if (role === null) {
            await this.rolesService.createRole({value: "AUTHOR", description: "Автор статей"})
        }
        role = await this.rolesService.getRoleByValue("AUTHOR");
        await user.$set('roles', [role.id]);
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUserByName(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email : {
                    [Op.eq] : email
                }
            }
        });
        return user;
    }

    async addRole (dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if(role && user){
            await user.$add('role',role.id);
            return dto;
        }
        throw new HttpException('Пользователь, или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async addPost (dto: AddPostDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const post = await this.postsService.getPostById(dto.postId);
        if (post && user) {
            await user.$add('post', post.id);
            return dto;
        }
        throw new HttpException('Пользователь, или пост не найден', HttpStatus.NOT_FOUND);
    }


}
