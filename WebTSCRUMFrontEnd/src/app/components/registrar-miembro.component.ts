import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/miembro';

@Component({
  selector: 'register-miembro',
  templateUrl: '../views/register-miembro.html',
  providers: [UserService]
})
export class RegistrarMiembroComponent implements OnInit{
  public titulo = 'Agregar Miembro';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public vista: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
  	this.user = new User('','','','','','','ROLE_USER');
  	this.user_register = new User('','','','','','','ROLE_USER');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('registrar-miembro.component cargado');

  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();

    this._route.params.forEach((params: Params) => {   
      let idUser = params['idUser'];

      if(idUser == this.identity.id && this.identity.role == 'ROLE_ADMIN'){
        this.vista = 'admin';
      }else{
        this.vista = 'user';
        this.alertMessage = 'No tienes permisos a esta vista';
      }
    });
  }

  onSubmitRegister(){
  	//console.log(this.user_register);

  	this._userService.register(this.user_register).subscribe(
      response => {
        let user = response;
        this.user_register = user;

        if(!user.id){
          this.alertMessage = 'Error al registrar miembro';
        }else{
          this.alertMessage = 'El registro se ha realizado correctamente, ingresa con ' + this.user_register.matricula;
          this.user_register = new User('','','','','','','ROLE_USER');
        } 
      },
      error => {
        var errorMessage = <any>error;

          if(errorMessage != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            
            console.log(error);
          }
      }      
    ); 
  }

}
