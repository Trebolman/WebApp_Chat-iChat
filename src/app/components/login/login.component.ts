import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from "@angular/router";
import { AuthService, TokenPayload } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    username: '',
    email: '',
    password: ''
  };
  public isLog: string;
  // public logState: boolean;
  public message: string;

  constructor(private _wsService: WebsocketService,
    private _router: Router,
    private _auth: AuthService) { }

  ngOnInit() {
  }

  ingresar() {
    // console.log("[LoginComponent|ingresar] credentials:");
    // console.log(this.credentials);
    this._auth.login(this.credentials).subscribe((response) => {
      // console.log("[login]:");
      // console.log(response);
      this.isLog = 'si';

      // Ingreso al socket
      this._wsService.loginWs(this.credentials.username).then((resp) => {
        // console.log("[loginComponente|ingresar] resp:");
        // console.log(resp);
        this._router.navigateByUrl('/mensajes');
      }).catch((err) => {
        // console.log("[loginComponente|catch] err:");
        // console.log(err);
      }); //envia al servidor

      // this._router.navigateByUrl('/tasks');
    }, (err) => {
      if (err.message) {
        this.message = "Usuario no registrado, registrese primero por favor";
      }
      this.isLog = 'no';
      // console.error("[login] Error]");
      // console.error(err);
    });


  }

}
