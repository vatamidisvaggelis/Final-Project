import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { loggedInUser, loginUser } from '../../shared/interfaces/user';
import {jwtDecode} from 'jwt-decode'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [
  ReactiveFormsModule
],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  userService = inject(UserService);
   message: string ="";

  form = new FormGroup({
    username : new FormControl("",Validators.required),
    password : new FormControl("", [Validators.required,Validators.minLength(5)])
  })

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        const access_token = params["token"];
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          const decodedToken = jwtDecode(access_token) as unknown as loggedInUser
          console.log("OnInit", decodedToken);
          this.userService.fill_signal(decodedToken)
          
  }})
          this.router.navigate(['user-registration-example']);
        }
      
  


  login(){

    //console.log(this.form.value)

    const credentials = (this.form).value as loginUser

    // console.log(credentials)

      this.userService.login_user(credentials)
      .subscribe({

        next:(response)=>{
           console.log(response)
           this.message ="";
          const access_token  = response.data;
          localStorage.setItem('access_token', access_token)
          const decoded_token = jwtDecode(access_token) as loggedInUser
          console.log(decoded_token);
          this.userService.fill_signal(decoded_token)
          console.log(this.userService.user$())
          this.router.navigate(['registration/form'])

        },

        error:(response) =>{
          //console.log(response)
          console.log(response.error.message)

          this.message = response.error.message;
          
        }
      })
    }
  }

  // print(){
  //   console.log(this.form.get('username')?.value)
  // }


