import { Component, OnInit} from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private _wsService:WebsocketService, 
              private _chatService:ChatService,
              private _auth:AuthService,
              private _router:Router){
  }
  ngOnInit(){
    if(this._auth.isLoggedIn()){
      this._router.navigateByUrl("/mensajes");
    }else{
      this._router.navigateByUrl("/login");
    }
  }
}
