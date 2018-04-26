import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { User } from '../models/miembro';
import { Technology } from '../models/technology';
import { Sprint } from '../models/sprint';
import { SprintID } from '../models/sprintID';

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
	public alertMessageSprint;
	public miembros: User[] = [];
	public miembrosAux: User[] = [];
	public tecnologias: Technology[] = [];
	public rol: string;
	public sprint: Sprint;
	public sprintsProject: SprintID[] = [];	

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
		this.sprint = new Sprint(0,'','');
	}

	ngOnInit(){
		console.log('detalles-proyecto.component cargado');

		this.getProyecto();
		this.getProyectoAndTecno();
		this.getSprints();
	}

	getSprints(){
		this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];

			 
				this._proyectoService.getProyectoAndSprint(this.token, idProject).subscribe(
					response => {	
						let indice = null;
						//console.log(response[0].sprints);
						for (var i in response[0].sprints) {
							//console.log(response[0].sprints[i].comment);
							let aux = new SprintID(response[0].sprints[i].id, response[0].sprints[i].days, response[0].sprints[i].comment, response[0].sprints[i].project_id);
							console.log(aux);							
							this.sprintsProject.push(aux);
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

	getProyectoAndTecno(){
		this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];

			 
				this._proyectoService.getProyectosAndTecnos(this.token).subscribe(
					response => {	
						let indice = null;
						
						for (var i in response) {
							//console.log(response[i].id);	
							if(response[i].id == idProject){
								indice = i;
							}
						}	
						//console.log(response[0].technologies);
						for (var i in response[indice].technologies) {
							let aux = new Technology(response[indice].technologies[i].id, response[indice].technologies[i].name, response[indice].technologies[i].Project_technologies.version)
							this.tecnologias.push(aux);
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

	createSprint(){
		
		if(this.sprint.days < 0){
			this.alertMessageSprint = "No puedes introducir días negativos";
		}else{
			this._route.params.forEach((params: Params) => {		
				let idProject = params['idProject'];

				this.sprint.project_id = idProject;					

				this._proyectoService.addSprint(this.token, this.sprint).subscribe(
					response => {					
						console.log(response);
						this.sprintsProject = [];
						this.getSprints();
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

	eliminarMiembro(idmi, role){
		if(role == "product_owner"){
			localStorage.esOwner = "No";
		}
		
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

	eliminarSprint(idSp){				

		this._proyectoService.deleteSprint(this.token, idSp).subscribe(
			response => {					
				if(!response){
					this._router.navigate(['/']);
				}else{						
					console.log(response);
					//this._router.navigate(['/mis-proyectos',this.identity.id]);
					this.sprintsProject = [];
					this.getSprints();
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