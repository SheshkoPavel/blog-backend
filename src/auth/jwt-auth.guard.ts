import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            //Если приходит пустой header, в котором нет токена или не указан его тип, то бросаем ошибку
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован. Нет прав доступа!'})
            }

            const user = this.jwtService.verify(token);
            request.user = user;
            return true;     //Если функция возвращает true, то доступ к эндпоинту будет разрешён

        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({message: 'Пользователь не авторизован. Нет прав доступа!'})
        }
    }

}