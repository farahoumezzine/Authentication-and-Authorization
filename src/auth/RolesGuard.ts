import { Injectable , ExecutionContext} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { CanActivate } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!requiredRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return  user.role === requiredRoles;
    }
    
}