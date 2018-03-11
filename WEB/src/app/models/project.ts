export class Project{
    public name: String;
    public start: String;
    public end: String;
    public description: String;
    public background: String;
    public risk: String;
    public vision: String;	
    public scope: String;
    public technologies: String;
    
	constructor(name: String, start: String, end: String, description: String, background: String, risk: String, vision: String, scope: String, technologies: String){
        this.name = name;
        this.start = start;
        this.end = end;
        this.description = description;
        this.background = background;
        this.risk = risk;
        this.vision = vision;
        this.scope = scope;
        this.technologies = technologies;
    }
}