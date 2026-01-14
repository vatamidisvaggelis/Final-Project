import { CanActivateFn ,} from '@angular/router';
import { UserService } from '../services/user.service';
import { Component,inject,Inject } from '@angular/core';
import { Router } from '@angular/router';




export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);

const user = userService.user$
const router = inject(Router)


  if(user() && !userService.isTokenExpired()){
  return true;
}
else 

  return router.createUrlTree(['restricted/area'])
  

}
