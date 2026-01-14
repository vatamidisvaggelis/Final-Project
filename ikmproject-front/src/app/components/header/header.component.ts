import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userService = inject(UserService)
  user = this.userService.user$


  log_Out(){
    this.userService.logOutUser()
  }

}
