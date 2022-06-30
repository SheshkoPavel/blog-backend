import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        SequelizeModule.forRoot({   //Найстройка Type ORM Sequelize
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'sheshko12091309',
            database: 'blog',
            models: [],
            autoLoadModels: true
        }),
        UsersModule,
    ]
})
export class AppModule {}