//importando libreria express
import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import http from 'http';
import socketIO from 'socket.io';
import { NUsuariosLista } from "./n_usuario_lista";
import { NUsuario } from './n_usuario';

//creando la clase del servidor
export default class Server{
    //creando la variable del servidor express
    public app:express.Application;
    public port:Number;
    private httpServer:http.Server;
    public io:socketIO.Server;
    public usuariosConectados = new NUsuariosLista();

    //constructor del servidor
    constructor(){
        this.app = express();//instancia del servidor
        this.port = SERVER_PORT;
        // this.port = 3600;
        //Configurando el nuevo servidor web a través de http
        this.httpServer = new http.Server(this.app);//httpserver si es compatible con socket
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    // Programando getter de la unica instancia de la clase
    // patron de diseño singleton para no crear muchas instancias de Server
    private static _instance:Server;
    public static get instance(){//Es un get
        if(this._instance){ //Si es que ya existe una instancia, retorna la misma instancia
            return this._instance;
        }else{
            this._instance = new this();
            return this._instance;
        }
    } 

    //funcion para escuchar las conexiones
    public escucharSockets(){
        console.log("Listo para recibir conexiones o sockets o clientes");
        this.io.on('connect',cliente=>{
            console.log("['connect'|cliente] nuevo cliente:")
            console.log(cliente.id);

            const usuario = new NUsuario(cliente.id);
            this.usuariosConectados.agregar(usuario);

            

            //el cliente que se ha conectado previamente, escucha su desconexion
            cliente.on('disconnect',()=>{
                this.usuariosConectados.deleteUsuario(cliente.id);
                console.log("el cliente se ha desconectado");
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());

            });

            //el cliente que se ha conectado previamente, escucha un evento de nombre
            cliente.on('mensaje',(contenido)=>{//contenido = payload
                console.log("[on-mensaje] =>", contenido);
                this.io.emit('mensaje-nuevo',contenido);
            });

            //
            cliente.on("configurar-usuario",(payload:any, callback:Function)=>{
                //emitir 
                console.log("[escucharSockets|'configurar-usuario'] payload:");
                console.log(payload);
                this.usuariosConectados.updateNombre(cliente.id, payload.nombre);
                this.io.emit('usuarios-activos',this.usuariosConectados.getLista());
                // console.log("[escucharSockets|'configurar-usuario']:");
                callback({
                    ok: true,
                    mensaje: `Usuario ${payload.nombre} configurado`
                });
            });

            //Obtener usuarios cuando se loguea
            cliente.on('obtener-usuarios',()=>{//contenido = payload
                this.io.in(cliente.id).emit('usuarios-activos',this.usuariosConectados.getLista()); //in selecciona a un usuario
            });
        });
    }

    //funcion para iniciar el servidor
    public start(callback:Function){
        this.httpServer.listen(this.port,callback);//empieza a escuchar el puerto
    }
}
