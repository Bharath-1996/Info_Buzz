import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

@Injectable({
  providedIn: 'root'
})

export class Message{

  constructor(public content:string,public sentBy:string){}
}
export class ChatService {

  readonly token=environment.dialogflow.angularBot;
  readonly client=new ApiAiClient({accessToken:this.token});
conversation=new BehaviorSubject<Message[]>([]);
  constructor() { }

  update(msg:Message)
  {
    this.conversation.next([msg]);
  }

  converse(msg:string)
  {
const userMessage=new Message(msg,'user');
this.update(userMessage);
return this.client.textRequest(msg)
                  .then(res=>{
                     const speech=res.result.fulfillment.speech;
                     const botMessage=new Message(speech,'bot');
                     this.update(botMessage);
                  })
  }

  talk(){
    this.client.textRequest('Who are you!').then(res=>console.log(res))
  }
}
