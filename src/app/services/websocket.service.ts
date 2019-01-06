import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // atributos
  public socketStatus:boolean;
  public usuario:Usuario;

  // constructor
  constructor(private _socket:Socket, private _router:Router) {
    this.checkStatus();
    this.loadStorage();
  }

  
  public checkStatus(){
    this._socket.on('connect',()=>{
      // console.log("Conectado al sevidor correctamente");
      this.socketStatus = true;
    });

    this._socket.on('disconnect',()=>{
      // console.log("Desconectado del servidor");
      this.socketStatus = false;
    });
  }
  //disparar eventos (cualquier evento)
  public emitir(evento:string, payload?:{de:string, cuerpo:string}, callback?:Function){
    this._socket.emit(evento,payload,callback);//verdadera funcion de socket.io
  }

  public escuchar(evento:string){//funcion genérica
    return this._socket.fromEvent(evento);//nos vamos a suscribir desde el mismo componente. estamos retornando el observable
  }

  public loadStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWs(this.usuario.nombre).then(()=>{

      }).catch((err)=>{
        console.log("Error",err);
      });
    }
  }
  

  public saveStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  // login
  public loginWs(nombre:string){
    // console.log("[WebsocketService|LoginWs] nombre usuario:");
    // console.log(nombre);

    return new Promise((resolve, reject)=>{
      this._socket.emit("configurar-usuario",{nombre: nombre},(resp)=>{
        if(resp.ok == true){
          this.usuario = new Usuario(nombre);
          this.saveStorage();
          resolve(resp);
        }else{
          reject();
        }
      });
    });
    // this._socket.emit("configurar-usuario",{nombre: nombre},(resp)=>{
    //   console.log(resp);
    // });
  }

  public logoutWs(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    this._socket.emit('configurar-usuario',{nombre: 'sin nombre'},()=>{});
    this._router.navigateByUrl('/login');
  }

  public getUsuario(){
    return this.usuario;
  }
}
