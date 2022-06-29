import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

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


    await app.listen(PORT, ()=> console.log(`Server started at port = ${PORT}`));
}

start ();