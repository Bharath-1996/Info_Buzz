import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from 'src/app/shared/employee.model';
import { format } from 'url';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email:string;
  password:string;
  public frmSignup: FormGroup;

  
  constructor(public auth:AuthService,private firestore:AngularFirestore,private fb: FormBuilder,private afauth:AngularFireAuth,public router:Router) 
  { 
    this.frmSignup = this.createSignupForm();
  }createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    // do signup or something
    //console.log(this.frmSignup.value);
    //console.log(this.frmSignup.controls.email.value);
    this.auth.signup(this.frmSignup.controls.email.value,this.frmSignup.controls.password.value);
  }
  ngOnInit() 
  {
    
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['main']);
   }
  }
signup()
{
  this.auth.signup(this.email,this.password);
  this.email=this.password='';
}

}
