import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const cors = require('cors');

async function start () {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    //Возможность отсылать запросы на локальный сервер
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'PATCH', 'OPTIONS', 'HEAD', 'DELETE'],
        credentials: true,
    }));

    //Описание Swagger
    const config = new DocumentBuilder()
        .setTitle('Backend for Blog')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('Blog', 'http://localhost:5000')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, ()=> console.log(`Server started at port = ${PORT}`));
}

start ();