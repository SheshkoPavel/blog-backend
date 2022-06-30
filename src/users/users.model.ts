import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttributes {
    email: string;
    password: string;
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

    @ApiProperty({example: 'Иванов Игорь Петрович', description: 'ФИО пользователя, по умолчанию: Unknown fox'})
    @Column({type: DataType.STRING, allowNull: true, defaultValue: 'Unknown fox'})
    name: string;
}