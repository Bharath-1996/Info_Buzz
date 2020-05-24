import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { SignInComponent } from './employees/sign-in/sign-in.component';
import { SignUpComponent } from './employees/sign-up/sign-up.component';
import { AuthGuard } from './shared/auth.guard';
import { EmployeeListsComponent } from './employees/employee-lists/employee-lists.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { ProfileComponent } from './employees/profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { IsloggedinauthGuard } from './shared/isloggedinauth.guard';


const routes:Routes=[
  { path: '', redirectTo:'/main',pathMatch:'full'},
  //{ path: 'mains', component:EmployeeListComponent,canActivate:[AuthGuard]},
  { path: 'main', component:EmployeeListsComponent,canActivate:[AuthGuard]},
  //{ path: 'main', component:EmployeeComponent,canActivate:[AuthGuard]},
  { path: 'sign-in', component:SignInComponent,canActivate:[IsloggedinauthGuard]},
  { path: 'sign-up', component:SignUpComponent,canActivate:[IsloggedinauthGuard]},
  { path: 'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  { path: 'profile/edit', component:ProfileComponent},
  { path: 'chats', component:ChatComponent,canActivate:[AuthGuard]},
 
 ]

 @NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
