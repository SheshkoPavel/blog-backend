import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';         //Генерация уникального названия для файла
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)) {   //Если не существует такого пути
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);   //Клею путь с названием файла
            return fileName;
        } catch (error) {
            throw new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
