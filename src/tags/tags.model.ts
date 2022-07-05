import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface TagCreationAttributes {
    tag: string;
}

@Table({tableName: 'roles'})
export class Tag extends Model<Tag, TagCreationAttributes> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'НАУКА', description: 'Уникальное значение Тега статьи'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    tag: string;

    @BelongsToMany(() => Post, () => UserRoles)
    posts: Post[];
}