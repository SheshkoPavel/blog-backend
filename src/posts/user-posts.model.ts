import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Post} from "./posts.model";


@Table({tableName: 'user_posts', createdAt: false, updatedAt: false})
export class UserPosts extends Model<UserPosts> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    postId: number;



}