import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public mensajePrivado: string;
  public usuariosConectados: any = [];
  // public userConnection = {
  //   id: '',
  //   privateConnections: []
  // };
  public username:string;

  constructor(private _chatService: ChatService, private _wsService: WebsocketService,
              private _router: Router,
              private _auth:AuthService) { 
                this.username = this._auth.getUserDetails().username;
    }

  ngOnInit() {
    this._chatService.getUsuarios();
    this._chatService.getUsuariosActivos().subscribe((resp) => {
      setTimeout(() => {
        this.usuariosConectados = resp;
      }, 100);
      // console.log("[user-listComponent|ngOnInit] usuariosConectados:");
      // console.log(this.usuariosConectados);
    });
  }

  // connectChat(id:string) {
  connectChat(usuario:any) {
    console.log("[user-list|connectChat] usuario:");
    console.log(usuario);
    usuario.sala = this._auth.getUserDetails().username;
    this._router.navigateByUrl("/mensajes/"+usuario.id);
  }
  
  disconnectChat(usuario:any){
    console.log("[user-list|connectChat] usuario:");
    console.log(usuario);
    this._router.navigateByUrl("/mensajes");
    usuario.sala = '';
  }
}
