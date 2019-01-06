import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    username: '',
    email: '',
    password: ''
  };

  public mensaje:string = "Tu username se mostrará en el chat";
  
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log("[register] credentials:");
    console.log(this.credentials);
    this.auth.testUsername(this.credentials.username).subscribe((response)=>{
      console.log("[testUsername] response:");
      console.log(response);
      
      if(response.disponible){
        this.auth.register(this.credentials).subscribe((response) => {
          console.log(response);
          
          this.router.navigateByUrl('/login');
        }, (err) => {
          console.error("[register] Error: "+err);
        });
        
      }else{
        this.mensaje = "username ya usado, por favor ingrese otro";
      }
    });
  }

}
