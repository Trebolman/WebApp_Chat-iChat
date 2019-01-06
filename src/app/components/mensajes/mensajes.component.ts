import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor(public _wsService:WebsocketService,
              private _auth:AuthService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this._wsService.logoutWs();
    this._auth.logout();
  }
}
