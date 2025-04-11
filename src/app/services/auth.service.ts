import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';

interface loginResponse {
  user: {
     _id: string,
     fullname: string,
     email: string,
     password: string,
     role: string,
     _v: number
  },
  token: string,
  userId: string,
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  usersSubject = new BehaviorSubject<any>({});
  users$ = this.usersSubject.asObservable();
  currentUsers!: any;


  signUp(fullname: string, email: string, password: string, role: string) {
     const body = {fullname, email, password, role};
     return this.http.post(`${environment.apiUrl}/user/signup`, body)
  }

  login( email: string, password: string,) {
    const body = { email, password};
    return this.http.post<loginResponse>(`${environment.apiUrl}/user/login`, body).pipe(
      tap((res)=>{
         localStorage.setItem('token', res.token)
         this.isLoggedInSubject.next(true) 
      })
    )
  }

  fetchAllUsers() {
    return this.http.get(`${environment.apiUrl}/admin/getAllUsers`).pipe(
      tap((response)=>{
        console.log('response is pipe ', response)
        console.log('all users are pipe ', response)  
        this.currentUsers = response;
        this.currentUsers = this.currentUsers.Users;
        this.usersSubject.next(this.currentUsers);  
      },
    ))
  } 

  deleteUsers(id: string) {
    this.currentUsers = this.usersSubject.value; 
    console.log('current users in delete are ', this.currentUsers)
    this.currentUsers = this.currentUsers?.filter((user: any) => user._id !== id);
    this.usersSubject.next(this.currentUsers);

    return this.http.get(`${environment.apiUrl}/admin/deleteUser/${id}`);
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  } 

  hasToken() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
 
}
