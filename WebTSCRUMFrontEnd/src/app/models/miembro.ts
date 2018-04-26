export class User{
	constructor(
		public id: string,
		public matricula: string,
		public nombre: string,
		public carrera: string,
		public fotografia: string,
		public password: string,
		public role: string
	){}
}