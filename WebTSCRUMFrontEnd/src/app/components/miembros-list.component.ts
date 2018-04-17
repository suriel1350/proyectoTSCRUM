import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { User } from '../models/miembro';
import { Detalles } from '../models/detallesids';

@Component({
  selector: 'ver-miembros', 
  templateUrl: '../views/ver-miembros.html',
  providers: [UserService, ProyectoService]
})

export class MiembrosGetComponent implements OnInit{
	public titulo: string;
	public user: User[] = [];
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public detalles: Detalles;		

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Miembros actuales';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  		this.detalles = new Detalles('', '');
	}

	ngOnInit(){
		console.log('miembros-list.component cargado');

		this.conseguirMiembros();
	}

	conseguirMiembros(){							
				
			if(this.identity.role == 'ROLE_ADMIN'){			
				this._userService.getMiembros(this.token, this.identity.id).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response);
		 					for (var i in response) {
		 						//console.log(response[i]);
								this.user.push(response[i]);
		 					}
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
			}else{
			  	this.alertMessage = 'Token no valido';				
			}
			
	}

	addMiembro(id){
		/*this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];
			this.detalles.idmiembro = id;
			this.detalles.idproyecto = idProject;

			//console.log(this.detalles);
			this._proyectoService.addMiembros(this.token, this.detalles).subscribe(
				response => {					

					if(!response){
						this._router.navigate(['/']);
					}else{						
						//console.log(response[0].idmiembros); 
						console.log(response);
						this.alertMessage = 'Miembro agregado';
						//this.proyecto = response[0].idmiembros;						

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
		});*/
	}
}