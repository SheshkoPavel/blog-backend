import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            //Если приходит пустой header, в котором нет токена или не указан его тип, то бросаем ошибку
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован. Нет прав доступа!'})
            }

            const user = this.jwtService.verify(token);
            request.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));  //Есть ли у пользователя такая роль, кот. находится в необходимых для ендпоинта ролях

        } catch (error) {
            console.log(error)
            throw new HttpException('Нет прав доступа!', HttpStatus.FORBIDDEN)
        }
    }

}