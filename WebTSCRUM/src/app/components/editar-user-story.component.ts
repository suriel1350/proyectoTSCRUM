import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { UserStory } from '../models/user_history';

@Component({
	selector: 'editar-user-story',
	templateUrl: '../views/editar-user-story.html',
	providers: [UserService, ProyectoService]
})

export class UserStoryEditComponent implements OnInit{
	public titulo: string;
	public user_history: UserStory;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public userStoryId: string;

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
		console.log('editar-user-story.component cargado');
		this.getUserStory();
	}

	getUserStory(){							
		this._route.params.forEach((params: Params) => {		
			let idUserStory = params['idUserStory'];
			this.userStoryId = idUserStory;

			this._proyectoService.getUserStory(this.token, idUserStory).subscribe(
				response => {					

					if(!response){
						this._router.navigate(['/']);
					}else{						
						//console.log(response);						
						this.user_history.id = response.id;
						this.user_history.weight = response.weight;
						this.user_history.scrum_board_status = response.scrum_board_status;
						this.user_history.description = response.description;
						this.user_history.priority = response.priority;
						this.user_history.sprint_id = response.sprint_id;
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
		this._route.params.forEach((params: Params) => {		
			let idUserStory = params['idUserStory'];
			this.userStoryId = idUserStory;
						
			//console.log(this.proyecto);
			this._proyectoService.updateUserStory(this.token, idUserStory, this.user_history).subscribe(
				response => {					

					if(!response){
						this._router.navigate(['/']);
					}else{						
						//console.log(response);
						this.alertMessage = 'Historia actualizada correctamente';
						this._router.navigate(['/detalles-sprint', this.user_history.sprint_id]);						
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