import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let loginUserService = inject(LoginUserService);
  if (loginUserService.loginUser.username) {
    return true;
  } else {
    return false;
  }
};
