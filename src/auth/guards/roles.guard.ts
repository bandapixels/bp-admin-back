// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
//
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from '../models/role.enum';
// import {User} from "src/auth/entity/User";
//
//
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//
//     if (!requiredRoles) {
//       return true;
//     }
//     // console.log('---------')
//     const user = context.switchToHttp().getRequest();
//     // console.log('------', user)
//     return requiredRoles.some((role) => user.role?.includes(role));
//   }
// }


import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    console.log(roles)
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(request)
    // return matchRoles(roles, user.roles);
  }
}
