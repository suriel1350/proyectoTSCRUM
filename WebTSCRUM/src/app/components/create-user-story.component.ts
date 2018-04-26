import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { UserStory } from '../models/user_history';

@Component({
	selector: 'create-user-story',
	templateUrl: '../views/create-user-story.html',
	providers: [UserService, ProyectoService]
})

export class UserStoryCreateComponent implements OnInit{
	public titulo: string;
	public user_history: UserStory;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public sprintId: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _proyectoService: ProyectoService
	){
		this.titulo = 'Crear nueva historia de usuario';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.user_history = new UserStory(null,null,null,'',null,null);
	}

	ngOnInit(){
		console.log('create-user-story.component cargado');
		this.getSprintId();
	}

	getSprintId(){
		this._route.params.forEach((params: Params) => {		
			let idSprint = params['idSprint'];
			
			this.sprintId = idSprint;
		});
	}

	onSubmit(){
		this._route.params.forEach((params: Params) => {		
			let idSprint = params['idSprint'];
				this.user_history.sprint_id = idSprint;
				console.log(this.user_history);
			
				this._proyectoService.addUserStory(this.token, this.user_history).subscribe(
					response => {
						
						if(!response){
							this.alertMessage = 'Error en el servidor';
						}else{
							this.alertMessage = '¡La historia se ha creado correctamente!';
							//this.proyecto = response.artist;
							this._router.navigate(['/detalles-sprint', this.sprintId]);
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