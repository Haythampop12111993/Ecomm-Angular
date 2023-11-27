import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    const router = inject(Router);
    router.navigateByUrl('');
    return false;
  }
  return true;
};
