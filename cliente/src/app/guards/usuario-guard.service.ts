
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor(private _wsService:WebsocketService, private _router:Router) { }

  canActivate(){ //Quien autoriza al usuario si accede
    if(this._wsService.getUsuario()){
      return true;
    }else{
      this._router.navigateByUrl("");
      false;
    }
  }
}
