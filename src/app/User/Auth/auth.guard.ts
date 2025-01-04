import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginUserService } from '../services/login-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let loginUserService = inject(LoginUserService);
  let router = inject(Router);
  if (!(loginUserService.loginUser.userType == 'admin')) {
    return true;
  } else {
    router.navigate(['/login']);

    return false;
  }
};
