import { Project } from "./project.model";

export class Technology {
    constructor(
        public name: string,
        public projects?: Project[],
        public id?: number,
    ) { }
}