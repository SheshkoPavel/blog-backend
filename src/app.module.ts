import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";

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
    ]
})
export class AppModule {}