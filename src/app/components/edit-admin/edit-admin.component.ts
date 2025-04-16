import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { authInterceptor } from '../../interceptors/auth.interceptor';
import { LoaderComponent } from "../loader/loader.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-admin',
  imports: [FormsModule, LoaderComponent],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})

export class EditAdminComponent {
    editUser: any = {}
    id: string = "";
    isLoading: boolean = true;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id') || "";
      this.authService.getUserFromId(this.id).subscribe({
         next: (res)=> { 
          this.editUser = res.user;  
          this.isLoading = false;
         },
         error: (err)=> {
           alert(err.error.message)
         }
      })
    }
    onEdit() {
       this.isLoading = true;
       const body = this.editUser;
       this.http.post(`${environment.apiUrl}/admin/updateUser/${this.id}`, body).subscribe({
        next: (res)=> {

          this.authService.fetchAllUsers().subscribe({
            next: ((res)=> { 
               alert('User updated successfully')
               this.router.navigate(['/admin'])
            }),
            error: (err) =>{
              alert(err.error.message)
              this.router.navigate(['/user/login']) 
            }
          }) 
        },
        error: (err)=>{ 
          alert(err.error.message)
          this.router.navigate(['/user/login']) 
        }
       })
    }
}
