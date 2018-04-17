// import { Log } from "./log.model";
// import { Task } from "./task.model";
import { Project } from "./project.model";

export class Member {
    constructor(

        public department_major: string,
        public name: string,
        public photo_URL: string,
        public password: string,
        public system_role: string,
        public createdAt: Date,
        public updatedAt: Date,
        //As these are optional parameters, they go at the end
        public id?: string, 
        // public logs?: Log[],
        // public tasks?: Task[],
        public projects?: Project[]
    ) { }
}
