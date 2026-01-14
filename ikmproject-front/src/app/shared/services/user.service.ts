import { Injectable,effect,inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { bootstrapApplication } from '@angular/platform-browser';
import { observeOn } from 'rxjs';
import { loggedInUser, loginUser, User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';


const API_URL =`${environment.apiURL}/ikm/employees`;

const API_URL2 =`${environment.apiURL}/ikm/auth` 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  router = inject(Router);

  constructor() {

    const access_token = localStorage.getItem('access_token')
    if (access_token){
      const decoded_token = jwtDecode(access_token) as loggedInUser
      this.fill_signal(decoded_token)
    }


    effect(()=>{
      if(this.user$()){
        console.log(this.user$()?.username)
      } 
    })
   }

  user$ = signal<loggedInUser|null>(null);

  http :HttpClient = inject(HttpClient);
  
  check_user (username:string){
    return this.http.get<{status:Boolean, data:Object}>(`${API_URL}/username/${username}`, )
  }

  login_user(login_user:loginUser){
    return this.http.post<{status : Boolean, data:string}>(`${API_URL2}`,login_user)
  }

  registerUser(user:User){
    return this.http.post<{status:boolean, data:User}>(`${API_URL}/`,user)
  }

  allUsers(){
    return this.http.get<{status: boolean ,data:User[]}>(`${API_URL}/`)
  }

  fill_signal(user:loggedInUser){
    this.user$.set({
      username : user.username,
      firstname : user.firstname,
      lastname : user.lastname
    })
  }

  logOutUser(){
    this.user$.set(null)
    localStorage.removeItem("access_token")
    this.router.navigate(["login"])
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem("access_token")
    if(!token) return true

    try{
    const decoded_token = jwtDecode(token)
    const exp = decoded_token.exp
    const now = Math.floor(Date.now()/1000)
    if(exp){
      return exp<now
    }else
       {return true}
    
    }catch (err){
    return true
    }
  }
}
