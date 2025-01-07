import { CanActivateFn, Router } from '@angular/router';
import { LoginUserService } from '../User/services/login-user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let loginUserService = inject(LoginUserService);
  let router = inject(Router);
  if (router) {
    // router.navigateByUrl('/admin');
    console.log('admin page');
    
    // router.navigate(['/admin/dashboard']);
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
  // if (loginUserService.loginUser.userType == 'admin') {
  //   return true;
  // } else {

  //   return false;
  // }
};
