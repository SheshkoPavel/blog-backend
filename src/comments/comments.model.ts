import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Post} from "../posts/posts.model";

interface CommentCreationAttributes {
    author: string;
    text: string;
    postId: number;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttributes> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Хитрый лис', description: 'Имя автора комментария'})
    @Column({type: DataType.STRING, allowNull: false})
    author: string;

    @ApiProperty({example: 'Отличная статья!', description: 'Текст комментария'})
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}