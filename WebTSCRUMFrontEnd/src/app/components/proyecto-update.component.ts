import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { ProyectoService } from '../services/proyecto.service';
import { UserService } from '../services/user.service';
import { Proyecto } from '../models/proyecto';
import { User } from '../models/miembro';

@Component({
  selector: 'project-update',
  templateUrl: '../views/project-update.html',
  providers: [UserService, ProyectoService]
})

export class ProjectUpdateComponent implements OnInit{
	public titulo: string;
	public user: User;
	public proyecto: Proyecto;	
	public auxNombre: string;
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
		this.titulo = 'Actualiza Proyecto';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.user = this.identity;
  		this.url = GLOBAL.url;
  		this.proyecto = new Proyecto('','','','','','','','','');  		
	}

	ngOnInit(){
		console.log('proyecto-update.component cargado');

		this.getProyecto();		
	}

	getProyecto(){							
		this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];
			
			this._proyectoService.getProyecto(this.token, idProject).subscribe(
				response => {					

					if(!response){
						this._router.navigate(['/']);
					}else{						
						//console.log(response[0]);
						this.proyecto.nombre = response[0].nombre;
						this.auxNombre = response[0].nombre;
						this.proyecto.id = response[0].id;						
						this.proyecto.vision = response[0].vision;
						this.proyecto.background = response[0].background;
						this.proyecto.riesgos = response[0].riesgos;
						this.proyecto.alcance = response[0].alcance;
						this.proyecto.fechainicio = response[0].fechainicio;
						this.proyecto.fechafinal = response[0].fechafinal;
						this.proyecto.role = response[0].role;
						console.log(this.proyecto);
						console.log(this.auxNombre);
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

	onSubmit(){
		if(this.proyecto.nombre == this.auxNombre){
			//Aqui actualizaremos proyecto pero sin el nombre
			this._route.params.forEach((params: Params) => {		
				let idProject = params['idProject'];
				
				this.proyecto.nombre = '';
				//console.log(this.proyecto);
				this._proyectoService.updateProyecto(this.token, idProject, this.proyecto).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response);
							this.alertMessage = 'Proyecto actualizado correctamente';
							this._router.navigate(['/mis-proyectos', this.identity.id]);							
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
			//Aqui actualizaremos proyecto con el nombre
			this._route.params.forEach((params: Params) => {		
				let idProject = params['idProject'];				
				
				this._proyectoService.updateProyecto(this.token, idProject, this.proyecto).subscribe(
					response => {					

						if(!response){
							this._router.navigate(['/']);
						}else{						
							//console.log(response);
							this.alertMessage = 'Proyecto actualizado correctamente';
							this._router.navigate(['/mis-proyectos', this.identity.id]);							
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