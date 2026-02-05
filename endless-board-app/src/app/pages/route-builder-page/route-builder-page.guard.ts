import { CanActivateFn, Router } from '@angular/router';
import { UserManagementService } from '../../services/user-management.service';
import { inject } from '@angular/core';

export const routeBuilderPageGuard: CanActivateFn = (route, state) => {
  const userManagementService = inject(UserManagementService);
  const router = inject(Router);
    
  if (!userManagementService.isLoggedIn()) {
    router.navigateByUrl("/main");
    return false;
  }  
  return true;
};
