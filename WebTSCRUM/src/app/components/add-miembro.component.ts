import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { User } from '../models/miembro';
import { Agregado } from '../models/agregado';
import { Detalles } from '../models/detallesids';
import { DetallesOwner } from '../models/detallesOwner';

@Component({
  selector: 'agregar-miembro', 
  templateUrl: '../views/agregar-miembro.html',
  providers: [UserService, ProyectoService]
})

export class MiembroAddComponent implements OnInit{
	public titulo: string;
	public user: User[] = [];
	public agregado: Agregado[] = [];
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public detalles: Detalles;	
	public detallesOwner: DetallesOwner;	
	public esOwner: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Agregar Miembro';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  		this.detalles = new Detalles('', '');
  		this.detallesOwner = new DetallesOwner('', '', '');
  		this.esOwner = localStorage.esOwner;
  		
	}

	ngOnInit(){
		console.log('add-miembro.component cargado');

		this.conseguirMiembros();
	}

	conseguirMiembros(){							
		
		this._userService.getMiembros(this.token, this.identity.id).subscribe(
			response => {					

				if(!response){
					this._router.navigate(['/']);
				}else{						
					//console.log(response);
 					for (var i in response) {
 						//console.log(response[i]);
						this.user.push(response[i]);
						let aux = new Agregado('No', 'No');
						this.agregado.push(aux);						
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
	}

	addMiembro(id){
		this._route.params.forEach((params: Params) => {		
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
						localStorage.esOwner = "Si";
						this.esOwner = localStorage.esOwner;
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
		});
	}

	addOwner(id){
		console.log(id);
		this._route.params.forEach((params: Params) => {
			let idProject = params['idProject'];
			this.detallesOwner.idmiembro = id;
			this.detallesOwner.idproyecto = idProject;
			this.detallesOwner.role = 'product_owner';
			this.esOwner = 'Si';

			this._proyectoService.addMiembros(this.token, this.detallesOwner).subscribe(
				response => {					

					if(!response){
						this._router.navigate(['/']);
					}else{						
						//console.log(response[0].idmiembros); 
						console.log(response);
						localStorage.esOwner = "Si";
						this.esOwner = localStorage.esOwner;
						this.alertMessage = 'Product Owner Agregado';
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
		});		
	}
}