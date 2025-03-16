import { CanActivateFn, Router } from '@angular/router';
import { UserManagmentService } from '../../services/user-managment.service';
import { inject } from '@angular/core';

export const profilePageGuard: CanActivateFn = (route, state) => {
  const userManagmentService = inject(UserManagmentService);
  const router = inject(Router);
    
  if (!userManagmentService.isLoggedIn()) {
    router.navigateByUrl("/main");
    return false;
  }  
  return true;
};
