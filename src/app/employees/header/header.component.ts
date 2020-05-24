import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/auth.service";
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChatDialogComponent } from 'src/app/chatbot/chat-dialog/chat-dialog.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthService,private dialog:MatDialog,public router:Router) { }

  ngOnInit() {
  }
  isloggedin()
  {
      
      let user =sessionStorage.getItem('token')
      return !(user === null)     
  }
  Logout()
{
  this.auth.Logout();
  this.router.navigate(['sign-in']);
}
profile()
{
  this.router.navigate(['profile']);
}
onAdd()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.height="50%";
    dialogConfig.position = {
      bottom: '20px',
      right: '5px'
  };
    
    this.dialog.open(ChatDialogComponent,dialogConfig);
  }
}
