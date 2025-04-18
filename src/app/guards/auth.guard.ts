import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core'; 

export const authGuard: CanActivateFn = (route, state) => {
   
  const authService = inject(AuthService);
  const router = inject(Router); 

  const isLoggedIn = authService.isLoggedInSubject.getValue();
 
  if(!isLoggedIn) {
       router.navigate(['/user/login'])
  }
  return true; //dummy return
};
