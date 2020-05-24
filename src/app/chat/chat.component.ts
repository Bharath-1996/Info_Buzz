import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireModule,FirebaseDatabase} from '@angular/fire';
import { EmployeeService } from '../shared/employee.service';
import { AuthService } from '../shared/auth.service';
import { EmployeeListsComponent } from '../employees/employee-lists/employee-lists.component';
import { ProfileComponent } from '../employees/profile/profile.component';
import * as firebase from 'firebase';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('firstName',{static: false}) searchElement: ElementRef;
 items:AngularFirestoreCollection<any>;
 finallist:any[];
 name:any;
 msgVal:string='';
 list :any[];
 count:string;
  userDoc: any;
  empname:string;
  
  

  constructor(public af:AngularFirestore,public afauth:AngularFireAuth,public service:EmployeeService,public fr:AngularFirestoreModule,private empservice:EmployeeService) 
  { 
    this.af.collection('messages').valueChanges().subscribe( values => 
      this.count=(values.length+1).toString());
    this.items=af.collection('messages');
    this.name=this.afauth.auth.currentUser.email;
    
  }
  chatsend(chatmsg:string)
  {
    ///console.log("length of chats is "+this.count);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    let data={};
    this.empservice.getemployeebyid().then(val => {
      if(val.fullName.trim)
      {
        this.empname=val.email.substring(0,val.email.indexOf('@'));
        
      }
      else
      {
      
      this.empname=val.fullName;      
      }
    });
    data['name']=this.empname;
    data['message']=chatmsg;
    data['createdAt']=timestamp();
    this.af.collection('messages').doc(this.count).set(data);
    //this.items.add({message:chatmsg,name:this.afauth.auth.currentUser.email});
    this.msgVal='';
    
  }
  
  ngOnInit() {
    //console.log("in chat page");
    this.service.getmessages().subscribe(actionArray =>{
      this.list=actionArray.map(item=>{
        return {
          id:item.payload.doc.id,
          ...(item.payload.doc.data() as object) };
                
      })
    });
    this.searchElement.nativeElement.focus(); 
  }
  

}
