import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
   isLogIn: boolean = false;
   private authSubscription!: Subscription;
  

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit() {
       this.authSubscription = this.authService.isLoggedIn$.subscribe({
          next: (loggedInVal) => {
            console.log('loggedin val ', loggedInVal)
            this.isLogIn = loggedInVal
          },
          error: (err) => {
             console.log(err.error)
          }
       })
   }

   ngOnDestroy() {
      this.authSubscription.unsubscribe(); //clean up
   }
   

   onLogout() {
      this.authService.logout();  
      this.isLogIn = false;
      this.router.navigate(['/'])
   }
}
