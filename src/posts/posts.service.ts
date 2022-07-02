import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post) { }

    async create(dto: CreatePostDto, image: any) {
        const fileName = 'asd';
        const post = await this.postRepository.create({...dto, image: fileName})  //Здесь нужно название,а не сам файл
        return post;
    }
}
