import { Component, OnInit} from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private _wsService:WebsocketService, private _chatService:ChatService){
  }
  ngOnInit(){
    this._chatService.recibirMensajePrivado().subscribe((resp)=>{
      console.log(resp);
    });

    this._chatService.recibirMensajesTogether().subscribe((resp)=>{
      console.log(resp);
    });
  }
}
