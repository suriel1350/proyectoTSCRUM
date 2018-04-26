import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';

@Component({
	selector: 'create-proyecto',
	templateUrl: '../views/create-proyecto.html',
	providers: [UserService, ProyectoService]
})

export class ProyectoCreateComponent implements OnInit{
	public titulo: string;
	public proyecto: Proyecto;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _proyectoService: ProyectoService
	){
		this.titulo = 'Crear nuevo proyecto';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proyecto = new Proyecto('','','','','','','','','');
	}

	ngOnInit(){
		console.log('create-project.component cargado');
	}

	onSubmit(){
		//this.proyecto
		//console.log(this.proyecto);
		
		this._route.params.forEach((params: Params) => {		
			let idUser = params['idUser'];
			
			if(idUser == this.identity.id){
				this._proyectoService.addProject(this.token, this.proyecto, idUser).subscribe(
					response => {
						
						if(!response){
							this.alertMessage = 'Error en el servidor';
						}else{
							this.alertMessage = '¡El Proyecto se ha creado correctamente!';
							//this.proyecto = response.artist;
							this._router.navigate(['/mis-proyectos', idUser]);
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

}