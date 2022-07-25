import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Comment} from "../comments/comments.model";
import {Tag} from "../tags/tags.model";
import {PostTags} from "../tags/post-tag.model";
import {UserPosts} from "./user-posts.model";

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
    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @ApiProperty({example: 'PUBLISHED', description: 'Текущий статус статьи'})
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'SAVED'})
    status: string;

    @ApiProperty({example: 'fj-ksd-hf-asd.jpg', description: 'Изображение к Статье'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ApiProperty({example: '2', description: 'id автора Статьи'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;


    //todo Change field name after Data Base delete
    @ApiProperty({example: '[...]', description: 'Массив с данными о пользователях к посту'})
    @BelongsToMany(() => User, () => UserPosts)
    author: User[];

    @ApiProperty({example: '[...]', description: 'Массив с данными о комментариях к посту'})
    @HasMany(()=> Comment)
    comments: Comment[];

    @ApiProperty({example: '[...]', description: 'Массив с данными о тегах к посту'})
    @BelongsToMany(() => Tag, () => PostTags)
    tags: Tag[];
}