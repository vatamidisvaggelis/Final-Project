import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './shared/guards/auth.guard';
import { RestrictedAreaComponent } from './components/restricted-area/restricted-area.component';
import { EmployeesComponent } from './components/employees/employees.component';

export const routes: Routes = [

    {    path: 'login', component: UserLoginComponent },
    {    path: 'registration/form', component: RegistrationFormComponent,
        canActivate: [authGuard]},
    {    path: 'employees', component:EmployeesComponent},
      
    {    path: 'restricted/area', component: RestrictedAreaComponent},
    {    path:  'welcome', component:WelcomeComponent},
    {    path: '', redirectTo:'/welcome',pathMatch:'full'}
   
    
];
