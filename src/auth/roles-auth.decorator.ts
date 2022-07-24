import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles'; //По этому ключу можно получать методанные внутри гварда

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);  //Будет являться нашим пользовательским декоратором