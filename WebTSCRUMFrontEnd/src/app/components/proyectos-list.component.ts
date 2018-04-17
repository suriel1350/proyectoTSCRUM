import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { Detalles } from '../models/detallesids';

@Component({
  selector: 'ver-proyectos',
  templateUrl: '../views/ver-proyectos.html',
  providers: [UserService, ProyectoService]
})

export class ProyectosComponent implements OnInit{
	public titulo: string;
	public proyecto: Proyecto[];
	public detalles: Detalles[] = [];	
	public identity;
	public token;
	public url: string;
	public alertMessage;	
	public next_page;
	public prev_page;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Mis Proyectos';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  		//this.detalles = new Detalles('', '');  		
	}

	ngOnInit(){
		console.log('proyectos-list.component cargado');		

		this.getProyectos();
	}

	getProyectos(){							
		this._route.params.forEach((params: Params) => {		
			let idUser = params['idUser'];

			if(idUser == this.identity.id){

				this._proyectoService.getMyProjects(this.token, idUser).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							for (var i in response) {
		 						//console.log(response[i].Proyecto.nombre);
		 						//this.detalles.push(response[i].Proyecto.nombre);
		 						//console.log(response[i].Proyecto.Miembro.nombre);
		 						//this.detalles.push(response[i].Proyecto.Miembro.nombre);

  								let aux = new Detalles(response[i].Proyecto.Miembro.nombre, response[i].Proyecto.nombre); 
  								this.detalles.push(aux);
								//this.detalles.push()
		 					}

							//console.log(this.detalles[0]);

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

				this._proyectoService.getProyectos(this.token, idUser).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response[0].idmiembros);

							this.proyecto = response[0].idmiembros;						

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
		});
	}

	eliminarProyecto(idpro){
		this._proyectoService.deleteProject(this.token, idpro).subscribe(
			response => {					
				if(!response){
					this._router.navigate(['/']);
				}else{						
					console.log(response);
					this.detalles = [];
					this.getProyectos();
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