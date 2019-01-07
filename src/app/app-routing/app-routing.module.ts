import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, CanActivate } from '@angular/router';
import { MensajesComponent } from '../components/mensajes/mensajes.component';
import { UsuarioGuardService } from '../guards/usuario-guard.service';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AppComponent } from '../app.component';

const appRoutes:Routes = [
  {path: '', component:AppComponent},
  {path: 'mensajes', component:MensajesComponent,canActivate:[UsuarioGuardService]},
  // {path: 'mensajes', component:MensajesComponent},
  {path: 'mensajes/:id', component:MensajesComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '**',component:AppComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)//funcion incluye rutas al modelo
  ],
  exports: [ //cuidao con esto
    RouterModule
  ]
})
export class AppRoutingModule { }
