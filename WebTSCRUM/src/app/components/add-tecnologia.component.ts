import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { User } from '../models/miembro';
import { Agregado } from '../models/agregado';
import { Detalles } from '../models/detallesids';
import { DetallesOwner } from '../models/detallesOwner';
import { Technology } from '../models/technology';

@Component({
  selector: 'agregar-tecnologia', 
  templateUrl: '../views/agregar-tecnologia.html',
  providers: [UserService, ProyectoService]
})

export class TecnoAddComponent implements OnInit{
	public titulo: string;
	public tecnologias: Technology[] = [];
	public agregado: Agregado[] = [];
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public detalles: Detalles;	
	public detallesOwner: DetallesOwner;	
	public esOwner: string;
	public textVersion: number;
  	public technology_id: number;	
	public tecnosToAdd: Technology;
  	public version: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Agregar Tecnología';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  		this.detalles = new Detalles('', '');
  		this.detallesOwner = new DetallesOwner('', '', '');
  		this.tecnosToAdd = new Technology('','','');
  		this.esOwner = localStorage.esOwner;
  		this.textVersion = null;
	}

	ngOnInit(){
		console.log('add-tecnologia.component cargado');

		this.conseguirTecnos();
	}

	conseguirTecnos(){							
		
		this._proyectoService.getTecnos(this.token).subscribe(
			response => {					
				for (var i in response) {
 						//console.log(response[i]);
						this.tecnologias.push(response[i]);
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

	addTecno(){
		this._route.params.forEach((params: Params) => {		
			let idProject = params['idProject'];
			let tecId = this.technology_id;
        	let vers = this.version;

   			let body = {
		        technology_id: this.technology_id,
		        project_id: idProject,
		        version: this.version
		      };

        	this._proyectoService.addTecnos(body).subscribe(
				response => {					
					this.alertMessage = 'La tecnología fue agregada';
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