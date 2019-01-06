import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, CanActivate } from '@angular/router';
import { MensajesComponent } from '../components/mensajes/mensajes.component';
import { UsuarioGuardService } from '../guards/usuario-guard.service';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

const appRoutes:Routes = [
  {path: '', component:LoginComponent},
  {path: 'mensajes', component:MensajesComponent,canActivate:[UsuarioGuardService]},
  {path: 'mensajes/:id', component:MensajesComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '**',component:LoginComponent}
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
