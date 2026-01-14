import { Component, inject } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { MatInputModule, } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select'
import{
  FormGroup,
  FormControl,
  Validators,
  
} from '@angular/forms'
import { RouterOutlet } from '@angular/router';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-registration-form',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    
],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  userService = inject(UserService)
  errorMessage:string ="";

  form = new FormGroup({
    username: new FormControl("",Validators.required),
    email: new FormControl("",[Validators.required, Validators.email]),
    firstname: new FormControl("",Validators.required),
    lastname: new FormControl("", Validators.required),
    age: new FormControl("",Validators.required),
    phone: new FormGroup({
      type: new FormControl("", Validators.required),
      number: new FormControl("",Validators.required),
        }),
    password: new FormControl("",[Validators.required,Validators.minLength(5)]),
    ConfirmPassword: new FormControl("",[Validators.required,Validators.minLength(5)]),

  },this.password_match


)

  OnSubmit(){
    // console.log(this.form.value);
    //console.log(this.form)

    const user : User = {
      username : this.form.get('username')?.value || "",
      firstname : this.form.get('firstname')?.value || "",
      lastname : this.form.get('lastname')?.value || "",
      age: Number(this.form.get('age')?.value),
      phone : {
        type: this.form.controls.phone.controls.type.value || "",
        number: this.form.controls.phone.controls.number.value || ""
      },
      password : this.form.get('password')?.value || ""
    }

      console.log(user)

    this.userService.registerUser(user)
    .subscribe({
      next: (response)=>{
        console.log(response.data)
        this.errorMessage = "";
      },
      error: (response)=>{
        console.log(response)
      console.log(response.error.data.message)
      this.errorMessage = response.error.data.message
      }
    })

    }

    

  

  Reset(){
    this.form.reset();
  }

  Example(){
    this.form.setValue({
      username: "vaggelis",
      email: "vaggos@yahoo.gr",
      firstname: "vaggos",
      lastname: "vata",
      age: "35",
      phone:{
        type:"Home",
        number:"2310868345"
      },
      password:"1234567",
      ConfirmPassword:"1234567"

    })
  }

  dublicate_username(){
    const username = this.form.get('username')?.value
    if(username){
      console.log(username)
      this.userService.check_user(username)
      .subscribe({
        next: (response)=>{
          console.log(response.status)
          console.log(response.data)
          this.form.get('username')?.setErrors({usernamematch:true})
        },
        error: (response) =>{
          console.log(response)
          this.form.get('username')?.setErrors(null)

        }
      })
    }
  }

  password_match(control:AbstractControl):{[key:string]:boolean} | null{

    const form = control as FormGroup;

    const password = form.get('password')?.value;
    const ConfirmPassword = form.get('ConfirmPassword')?.value;

    if(password &&ConfirmPassword &&password!=ConfirmPassword) {

      form.get('ConfirmPassword')?.setErrors({mismatch:true})
      

      return {mismatch:true}
    }
    
    form.get('ConfirmPassword')?.setErrors(null)

    return null

  }

}


