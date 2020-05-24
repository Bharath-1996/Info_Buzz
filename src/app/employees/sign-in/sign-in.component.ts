import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email:string;
  password:string;
  showSpinner=true; 
  spinner=false;
  constructor(public auth:AuthService,private afauth:AngularFireAuth,public router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      //console.log("after login");
     this.navigate();
   }
  }
  navigate()
  {
    this.router.navigate(['main']);
  }
  login()
{
  this.spinner=true;
  this.auth.login(this.email,this.password);
   //this.email=this.password='';
}
resetpassword()
{
  if (!this.email) 
  { 
    alert('Please fill your email'); 
  }
  else
  {
    this.auth.resetpassword(this.email);
  }
}
}
