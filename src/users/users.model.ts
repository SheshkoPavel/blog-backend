import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttributes {
    email: string;
    password: string;
    avatar: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'yourEmail@gmail.com', description: 'email пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '1234567', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'Иванов Игорь Петрович', description: 'ФИО пользователя', default: 'Unknown fox' })
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'Unknown fox'})
    name: string;

    @ApiProperty({example: 'myAva.jpg', description: 'Аватар пользователя'})
    @Column({type: DataType.STRING, allowNull: true})
    avatar: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(()=> Post)
    posts: Post[];
}