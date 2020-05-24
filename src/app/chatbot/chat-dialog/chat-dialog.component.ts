import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService,Message } from '../../chatbot/chat.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/scan';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit,AfterViewChecked{
  
  @ViewChild('scrollMe',{static: false}) private myScrollContainer: ElementRef;

  messages:Observable<Message[]>;
  formValue:string;
  container: HTMLElement;
  constructor(private chat:ChatService) { }
           
  ngOnInit() {
    //this.chat.talk();
    this.messages=this.chat.conversation.asObservable()
                            .scan((acc,val)=>acc.concat(val));
                                                  
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
sendMessage()
{
  this.chat.converse(this.formValue);
  this.formValue='';
  this.scrollToBottom();
}

}