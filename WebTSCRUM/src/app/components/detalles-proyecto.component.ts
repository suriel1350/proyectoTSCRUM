import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { User } from '../models/miembro';

@Component({
  selector: 'get-proyecto',
  templateUrl: '../views/get-proyecto.html',
  providers: [UserService, ProyectoService]
})

export class ProyectoDetallesComponent implements OnInit{
	public titulo: string;
	public project: Proyecto;
	public identity; 
	public token;
	public url: string;
	public alertMessage;	
	public miembros: User[] = [];
	public miembrosAux: User[] = [];
	public rol: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Detalles de Proyecto';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
		this.project = new Proyecto('','','','','','','','','');  		
	}

	ngOnInit(){
		console.log('proyectos-list.component cargado');

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
							//console.log(response[0].idproyectos);
							this.project.id = response[0].id;
							this.project.nombre = response[0].nombre;
							this.project.vision = response[0].vision;
							this.project.background = response[0].background;
							this.project.riesgos = response[0].riesgos;
							this.project.alcance = response[0].alcance;
							this.project.fechainicio = response[0].fechainicio;
							this.project.fechafinal = response[0].fechafinal;
							this.project.role = response[0].role;

							//this.miembrosAux.push(response[0].idproyectos);
							//this.miembros = response[0].idproyectos;							
							if(response[0].idproyectos != null){
								for (var i in response[0].idproyectos) {
									var idM = (response[0].idproyectos[i].idmiembros);									
									this.miembrosAux.push(response[0].idproyectos[i].role);									
									
									//this.miembros
									this._proyectoService.getMiembro(this.token, idM).subscribe(
										resp => {					
											//this.miembros = response[0].idmiembros;	
											/*for (var i in response) {
												this.miembros = response.data;							
											}*/
											//this.miembrosAux.push(response.data);
											//console.log(this.miembrosAux.role);
											//this.miembrosAux.role = rol;
											//resp.data.role = idM;
											this.miembros.push(resp.data);
											//this.miembros = rol;
											
											//this.miembros[0].role = rol;
											//response.data.nombre = idM;
											//console.log(response.data.nombre);
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
								console.log(this.miembrosAux);
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
			
		});
	}

	eliminarMiembro(idmi){
		this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];

			this._proyectoService.deleteMiembro(this.token, idProject, idmi).subscribe(
				response => {					
					if(!response){
						this._router.navigate(['/']);
					}else{						
						console.log(response);
						//this._router.navigate(['/mis-proyectos',this.identity.id]);
						this.miembros = [];
						this.miembrosAux = [];
						this.getProyecto();
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