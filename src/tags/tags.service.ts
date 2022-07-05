import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tag} from "./tags.model";
import {CreateTagDto} from "./dto/create-tag.dto";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {
    }


    async createTag(dto: CreateTagDto) {
        const tag = await this.tagsRepository.create(dto);
        return tag;
    }

    async getAllTags() {
        return await this.tagsRepository.findAll();
    }

    async getTagByValue(value: string) {
        const tag = await this.tagsRepository.findOne({
            where: {
                tag: value
            }
        });
        return tag;
    }
}
