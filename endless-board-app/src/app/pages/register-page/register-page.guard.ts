import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../../services/user-management.service';

export const registerPageGuard: CanActivateFn = (route, state) => {
  const userManagementService = inject(UserManagementService);
  const router = inject(Router);
    
  if (userManagementService.isLoggedIn()) {
    router.navigateByUrl("/main");
    return false;
  }  
  return true;
};
