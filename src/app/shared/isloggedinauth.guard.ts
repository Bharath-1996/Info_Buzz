import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class IsloggedinauthGuard implements CanActivate {
  
constructor(private authService:AuthService,private router:Router)
{

}

canActivate():boolean
    {
          if(!sessionStorage.getItem('token'))
          {
            console.log("no token inside if");
            return true
            //this.router.navigate([''])
          }
          else
          {
            console.log("having token inside else");
            this.router.navigate(['main'])
            return true;
          }
    }

  }
  