import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';
import { EditAdminComponent } from '../edit-admin/edit-admin.component';
import { LoaderComponent } from "../loader/loader.component";
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, EditAdminComponent, LoaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  Users: any = []
  isLoading: boolean = true;
  
  private usersSubscription!: Subscription;
  
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}
  
  ngOnInit() {
     this.isLoading = true;

     this.authService.fetchAllUsers().subscribe(); //fetch all users     
    
     this.usersSubscription = this.authService.users$.subscribe({
        next: (users) => {
          this.Users = users;  
          console.log('users are ', this.Users) 
          if(users.length>0) this.isLoading = false;
        }
     })

  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe(); //clean up 
  }
 
  DeleteUser(id: string) { 
   
   this.authService.deleteUsers(id).subscribe({
      next: (res)=> {
        alert('User Deleted successfully')    
      },
      
      error: (err)=> {
        alert(err.errror.message)
      }
    })
  }

}
