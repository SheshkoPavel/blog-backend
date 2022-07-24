import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {UpdatePostDto} from "./dto/update-post.dto";
import {AddTagDto} from "../roles/dto/add-tag.dto";
import {TagsService} from "../tags/tags.service";
import sequelize from "sequelize";


@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private tagsService: TagsService,
                private fileService: FilesService) { }

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName})  //Здесь нужно название,а не сам файл
        return post;
    }

    async getAllPosts(query?) {
        const totalCount = await this.postRepository.count({col: 'id'});
        let posts;
        if (query.limit && query.page) {
            posts = await this.postRepository.findAll({include: {all: true}, order: [["id", "ASC"]],
            limit: query.limit, offset: (query.page - 1) * query.limit });
            return {posts, totalCount};
        }
        if (!query.limit && !query.page) {
            posts = await this.postRepository.findAll({include: {all: true}, order: [["id", "ASC"]]});
            return {posts, totalCount};
        }
        if (!query.limit || !query.page) {
            throw new HttpException('Не введён лимит или страница', HttpStatus.BAD_REQUEST)
        }

    }

    async getAllPublishedPosts() {
        const posts = await this.postRepository.findAll({where: {status: 'PUBLISHED'},
            include: {all: true}, order: [["createdAt", "DESC"]]});
        return posts;
    }

    async updatePost(dto: UpdatePostDto){
        const editedPost = await this.postRepository.update({title: dto.newPostTitle, content: dto.newPostContent,
                status: dto.newPostStatus},{
                    where: {id: dto.updateId}
            });
        return editedPost;
    }

    async addTag(dto: AddTagDto) {
        const post = await this.postRepository.findByPk(dto.postId);
        const tag = await this.tagsService.getTagByValue(dto.tag);
        if(tag && post){
            await post.$add('tag', tag.id);
            return dto;
        }
        throw new HttpException('Пост, или тег не найдены', HttpStatus.NOT_FOUND);
    }

    async getPostById(id: number) {
        const post = await this.postRepository.findOne({
                where: {
                    id: id
                },
                include: {all: true}

            });
        return post;
    }

    async getAllPostsByUserId(userId: number) {
        const { Op } = require("sequelize");
        const posts = await this.postRepository.findAll({
            where: {
                userId: userId,
                [Op.or]: [
                    { status: 'PUBLISHED' },
                    { status: 'SAVED' }
                ]
            },
            include: {all: true}
        });
        return posts;
    }

    async getStatsForPosts() {
        const allPublishedCount = await this.postRepository.count({
            col: 'id',
            where: {status: "PUBLISHED"}
        });
        const allSavedCount = await this.postRepository.count({
            col: 'id',
            where: {status: "SAVED"}
        });
        return {
            publishedPostsCount: allPublishedCount,
            savedPostsCount: allSavedCount
        }

    }
}
