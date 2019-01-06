import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public mensajePrivado: string;
  public usuariosConectados: any = [];

  constructor(private _chatService: ChatService, private _wsService: WebsocketService,
    private _router: Router) { }

  ngOnInit() {
    this._chatService.getUsuarios();
    this._chatService.getUsuariosActivos().subscribe((resp) => {
      setTimeout(() => {
        this.usuariosConectados = resp;
      }, 100);
      console.log("[user-listComponent|ngOnInit] usuariosConectados:");
      console.log(this.usuariosConectados);
    });
  }

  // cerrarSesion() {
  //   this._wsService.logoutWs();
  // }

  enviarMensajePrivado(id) {
    this._router.navigateByUrl("/mensajes/" + id);
    // console.log(id);
  }
}
