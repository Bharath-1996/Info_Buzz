import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()  
export class AuthGuard implements CanActivate {
  
constructor(private authService:AuthService,private router:Router)
{

}

canActivate():boolean
    {
          if(this.authService.isloggedin()&&(this.authService.afAuth.auth.currentUser.uid))
          {
            return true
          }
          else
          {
            this.router.navigate(['sign-in'])
            return false
          }
    }

  }
  

