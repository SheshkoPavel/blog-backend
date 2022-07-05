import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "../posts/posts.model";
import {PostTags} from "./post-tag.model";

interface TagCreationAttributes {
    tag: string;
}

@Table({tableName: 'tags'})
export class Tag extends Model<Tag, TagCreationAttributes> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'НАУКА', description: 'Уникальное значение Тега статьи'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    tag: string;

    @BelongsToMany(() => Post, () => PostTags)
    posts: Post[];
}