import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ProyectoService } from '../services/proyecto.service';
import { UserService } from '../services/user.service';
import { Proyecto } from '../models/proyecto';
import { User } from '../models/miembro';

@Component({
  selector: 'editar-miembro',
  templateUrl: '../views/editar-miembro.html',
  providers: [UserService, ProyectoService]
})

export class MiembroEditComponent implements OnInit{
	public titulo: string;
	public user: User;
	public proyecto: Proyecto;	
	public auxMatricula: string;
	public identity;
	public token;
	public alertMessage;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,		
		private _userService: UserService
	){
		this.titulo = 'Actualizar Miembro';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.user = this.identity;
  		this.url = GLOBAL.url;  		
  		this.user = new User('','','','','','','');  		
	}

	ngOnInit(){
		console.log('miembros-edit.component cargado');

		this.getMiembro();		
	}

	getMiembro(){							
		
		if(this.identity.role == 'ROLE_ADMIN'){			
			this._route.params.forEach((params: Params) => {		
				let idUser = params['idUser'];
				
				this._proyectoService.getMiembro(this.token, idUser).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response.data.nombre);
							this.user.nombre = response.data.nombre;
							this.user.carrera = response.data.carrera;
							this.user.matricula = response.data.matricula;
							this.auxMatricula = response.data.matricula;
							this.user.role = response.data.role;
							//this.user.password = response.data.password;
							//this.user.nombre = response[0].nombre;
							
							//console.log(this.proyecto);
							//console.log(this.auxNombre);
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
			});
		}else{
			this.alertMessage = 'Token no valido';
		}
	}

	onSubmit(){
		//console.log(this.user);
		if(this.user.matricula == this.auxMatricula){
			
			//Aqui actualizaremos miembro pero sin la matricula ya que no la cambio
			this._route.params.forEach((params: Params) => {		
				let idUser = params['idUser'];
				
				this.user.matricula = '';
				//console.log(this.proyecto);
				this._userService.updateMiembro(this.token, idUser, this.user).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response);
							this.alertMessage = 'Miembro actualizado correctamente';
							this._router.navigate(['/ver-miembros']);							
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
			});
		}else{
			
			//Aqui actualizaremos miembro con matricula porque la cambio
			this._route.params.forEach((params: Params) => {		
				let idUser = params['idUser'];				
				//console.log(this.proyecto);
				this._userService.updateMiembro(this.token, idUser, this.user).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response);
							this.alertMessage = 'Miembro actualizado correctamente';
							this._router.navigate(['/ver-miembros']);							
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
			});

		}
	}
}