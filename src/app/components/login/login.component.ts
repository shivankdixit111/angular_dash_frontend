import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {
    loginData = {
      email: '',
      password: ''
    }
    errorMessage: string = ''
    isLoading: boolean = true;

    constructor(private authService: AuthService, private router: Router) {}

    onLogin() {
      const {email, password} = this.loginData;
      this.authService.login(email, password).subscribe({
         next: (response)=> {
           const token = response.token; 
           const User = response.user; 
           localStorage.setItem('token', token)
           alert('Login Successful')
           console.log('logged in user is - ', response)

            if(User.role === "Admin") {
              this.router.navigate(['/admin'])
            } else {
              this.router.navigate(['/user/getProfile'])
            }
            this.isLoading = false;
         },
         error: (err)=> {
            alert(err.error.message || 'Login Failed. Try again later.')
         }
      })
    }
}
