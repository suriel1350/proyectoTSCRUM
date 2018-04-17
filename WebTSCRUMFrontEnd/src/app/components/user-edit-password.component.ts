import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/miembro';

@Component({
  selector: 'edit-password',
  templateUrl: '../views/edit-password.html',
  providers: [UserService]
})

export class UserEditPasswordComponent implements OnInit{
	public titulo: string;
	public user: User;
	public identity;
	public token;
	public alertMessage;
	public url: string;

	constructor(
		private _userService: UserService
	){
		this.titulo = 'Actualizar Password';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.user = this.identity;
  		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('user-edit-password component cargado');
		this.user.password = '';
	}

	onSubmit(){
		this._userService.updatePassword(this.user).subscribe(
			response => {
				if(!response){
					this.alertMessage = 'El Password no se ha actualizado';
				}else{			
					//this.user = response.user;
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.nombre;					

					this.alertMessage = 'Datos actualizados correctamente';					
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