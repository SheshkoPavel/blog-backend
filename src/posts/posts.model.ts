import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";
import {Comment} from "../comments/comments.model";

interface PostCreationAttributes {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttributes> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Проблема загрязнения планеты пластиком', description: 'Заголовок Статьи'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'В XXI веке человечество столкнулось с проблемой загрязнения планеты',
        description: 'Текст Статьи'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: 'PUBLISHED', description: 'Текущий статус статьи'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'SAVED'})
    status: string;

    @ApiProperty({example: '', description: 'Изображение к Статье'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(()=> Comment)
    comments: Comment[];
}