import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor(public _wsService:WebsocketService,
              private _auth:AuthService,
              private _chatService:ChatService) { }

  ngOnInit() {
    this._chatService.recibirMensajePrivado().subscribe((resp)=>{
      console.log(resp);
    });

    this._chatService.recibirMensajesTogether().subscribe((resp)=>{
      console.log(resp);
    });
  }

  cerrarSesion() {
    this._wsService.logoutWs();
    this._auth.logout();
  }
}
