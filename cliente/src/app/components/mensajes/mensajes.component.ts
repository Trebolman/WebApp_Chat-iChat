import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {

  constructor(public _wsService:WebsocketService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this._wsService.logoutWs();
  }
}
