import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core'; 

export const authGuard: CanActivateFn = (route, state) => {

 
   
  const authService = inject(AuthService);
  const router = inject(Router); 

  const isLoggedIn = authService.isLoggedInSubject.getValue();

  console.log('auth guard is ', isLoggedIn)
  if(isLoggedIn) {
    return true;
  } else {
    router.navigate(['/user/login'])
  }
  return true; //dummy return
};
