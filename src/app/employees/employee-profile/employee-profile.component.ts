import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeListsComponent } from "../employee-lists/employee-lists.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inject } from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
 recievedRow;
 imgsrc:string;
  constructor(public dialogRef:MatDialogRef<EmployeeListsComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any) { 
      this.recievedRow=data;
      this.imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxbNpnfOB2P-cWuGoTIJrSTnbyugR0faFv03_bE0rX_i7RDz3I7g&s";
      if(data.imageUrl!=null)
      {
        this.imgsrc=this.recievedRow.imageUrl;
      }
    }

  ngOnInit() {
  }

}
