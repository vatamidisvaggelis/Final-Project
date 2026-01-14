import { Component, inject,OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  ngOnInit(){
    this.viewAll()
  }

  userService = inject(UserService);
  data: User[] = []


  viewAll(){
    this.userService.allUsers()
    .subscribe({
      next: (response)=>{
        console.log(response.data)

        this.data = response.data as User []
        

      },
      error: (response)=>{
        console.log(response.error)
      }
    })
  }

}
