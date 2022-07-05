import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tag} from "./tags.model";

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {
    }




}
