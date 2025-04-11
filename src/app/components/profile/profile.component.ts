import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-profile',
  imports: [LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
   currentUser: any = {}
   isLoading: boolean = true;

   constructor(private authService: AuthService, private http: HttpClient) {}
   ngOnInit() {
      this.http.get(`${environment.apiUrl}/user/getProfile`).subscribe({
         next: (response)=>{
            console.log('users are ' , response)
            this.currentUser = response;
            this.currentUser = this.currentUser.userData;
            console.log('userData is - ', this.currentUser)
            this.isLoading = false;
         },
         error: (err)=>{
            console.log(err)
         }
      })
   }
}
