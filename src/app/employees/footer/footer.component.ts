import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChatDialogComponent } from 'src/app/chatbot/chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
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
