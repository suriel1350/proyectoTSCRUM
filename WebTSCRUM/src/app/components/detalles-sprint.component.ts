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
import { UserStory } from '../models/user_history';

@Component({
  selector: 'get-sprint',
  templateUrl: '../views/get-sprint.html',
  providers: [UserService, ProyectoService]
})

export class SprintDetallesComponent implements OnInit{
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
	public user_history: UserStory[] = [];
	public rol: string;
	public sprint: Sprint;
	public sprintsProject: SprintID;	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Detalles de Sprint';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
		this.project = new Proyecto('','','','','','','','','');  		
		this.sprint = new Sprint(0,'','');
		this.sprintsProject = new SprintID(0,0,'','');
	}

	ngOnInit(){
		console.log('detalles-sprint.component cargado');

		this.getSprints();
	}

	getSprints(){
		this._route.params.forEach((params: Params) => {		
			let idSprint = params['idSprint'];
 
			this._proyectoService.getSprintDetails(this.token, idSprint).subscribe(
				response => {						
					this.sprintsProject.id = response.id;
					this.sprintsProject.comment = response.comment;
					this.sprintsProject.project_id = response.project_id;
					this.sprintsProject.days = response.days;
					this.project.nombre = response.project.nombre
					
					for (var i in response.user_stories) {
						//console.log(response.user_stories[i]);
						let aux = new UserStory(response.user_stories[i].id, response.user_stories[i].weight, response.user_stories[i].scrum_board_status, response.user_stories[i].description, response.user_stories[i].priority, response.user_stories[i].sprint_id);
						//console.log(aux);							
						this.user_history.push(aux);
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

	eliminarUserStory(idUserSto){		
		this._proyectoService.deleteUserStory(this.token, idUserSto).subscribe(
			response => {					
				if(!response){
					this._router.navigate(['/']);
				}else{						
					//console.log(response);
					//this._router.navigate(['/mis-proyectos',this.identity.id]);
					this.user_history = [];					
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