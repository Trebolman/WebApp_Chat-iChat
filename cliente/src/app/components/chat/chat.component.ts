import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  // public mensajes:string[] = [];
  public mensajes:any = [];
  public mensaje:string;
  public div:any;
  public mensajeSubscription:Subscription;
  // public mensajeSubscription2:Subscription;
  public idDestino:string;

  constructor(private _chatService:ChatService, 
              private _activateRoute:ActivatedRoute, 
              private _route:Router, 
              private _httpClient:HttpClient) { 
    
  }

  // metodos
  ngOnInit() {
    // recibir mensajes recibe solo un mensaje
    // esta es la funcion que hace que el chat aparezca
    this.mensajeSubscription = this._chatService.recibirMensajes().subscribe((entrada)=>{
      this.div = document.getElementById("chat-mensajes");
      console.log(entrada);
      this.mensajes.push(entrada);
      setTimeout(()=>{
        this.div.scrollTop = this.div.scrollHeight;
      },50);
    });

    this._chatService.recibirMensajePrivado().subscribe((payload)=>{
      this.div = document.getElementById("chat-mensajes");
      console.log(payload.entrada);
      this.mensajes.push(payload);
      setTimeout(()=>{
        this.div.scrollTop = this.div.scrollHeight;
      },50);
    });


    this._activateRoute.params.subscribe((params)=>{
      console.log(params.id);
      this.idDestino = params.id;
    });
    
  }

  ngOnDestroy(){
    this.mensajeSubscription.unsubscribe(); //para dejemos de subscribirnos
    // this.mensajeSubscription2.unsubscribe(); //para dejemos de subscribirnos
  }

  enviar(){
    // this._chatService.enviarMensaje(this.mensaje);
    // this.mensaje = ""; //blanqueamos el mensaje luego de haber recibido
    if(this.mensaje.trim().length === 0){
      return;
    }else{
      if(this.idDestino){
        let misheaders = new HttpHeaders().set('Content-Type','application/json');
        // this._httpClient.post("http://localhost:3700/mensajes/"+this.idDestino,
        let contenido = {
          entrada: this.mensaje,
          de: this._chatService._wsService.usuario.nombre
                              
        }

        let url = "http://localhost:3700/mensajes/"+this.idDestino;
        this._httpClient.post(url,contenido,{headers:misheaders}).subscribe((resp)=>{
                                console.log(resp);
                              })
                              this.mensaje = "";
      }else{
        this._chatService.enviarMensaje(this.mensaje);
        this.mensaje = "";
      }
    } //trim es para quitar espacios en blanco a los constados{
  }
  
}
