import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule } from "@angular/forms";
import { MatDialog,MatDialogConfig, MatBottomSheetContainer } from "@angular/material";
import { EmployeeComponent } from "../employee/employee.component";
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';
import { ChatDialogComponent } from 'src/app/chatbot/chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-employee-lists',
  templateUrl: './employee-lists.component.html',
  styleUrls: ['./employee-lists.component.css']
})

export class EmployeeListsComponent implements OnInit {

  constructor(private service:EmployeeService,private afauth:AngularFireAuth,private dialog:MatDialog) { }
  displayedColumns: string[] = ['id', 'fullName', 'mobile', 'position','actions','uid','imageUrl'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchkey:string;
  dataSource =new MatTableDataSource();
  showSpinner=false;  
  ngOnInit() {
    this.showSpinner=true;
    this.service.getEmployees().subscribe(actionArray =>{
      let array=actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...(item.payload.doc.data() as object) } as Employee;
         
          
      })
      this.dataSource=new MatTableDataSource(array);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.showSpinner=false;
    });
                
               
            }
            searchclear()
            {
              this.searchkey='';
              this.applyFilter();
            }
            applyFilter() 
            {
              this.dataSource.filter = this.searchkey.trim().toLowerCase();
          
              if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
              }
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
            onEdit(emp: any)
            {
              // const dialogConfig=new MatDialogConfig();
              // dialogConfig.disableClose=false;
              // dialogConfig.autoFocus=true;
              // dialogConfig.width="70%";
              // this.dialog.open(EmployeeComponent,dialogConfig);
              const dialogRef=this.dialog.open(EmployeeProfileComponent,{
                width:'70%',
                data:{
                  name:emp.fullName,
                  empCode:emp.empCode,
                  mobile:emp.mobile,
                  position:emp.position,
                  imageUrl:emp.imageUrl,
                  uid:emp.id,
                  email:emp.email
                }
              });
            }
}
