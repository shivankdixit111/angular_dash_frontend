import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   signUpData = {
      fullname: '',
      email: '',
      password: '',
      role: ''
   }
   isLoading: boolean = true;

   constructor(private authService: AuthService, private router: Router) {}

   onSignUp() {
     const fullname = this.signUpData.fullname
     const email = this.signUpData.email
     const password = this.signUpData.password
     const role = this.signUpData.role

     this.authService.signUp(fullname, email, password, role).subscribe({
        next: (response) => {
           console.log(response)
           alert('User Created Successfully')
           this.router.navigate(['/user/login'])
           this.isLoading = false;
        },
        error: (err)=> {  
          alert(err.error.message)
        }
     })
   }
}
