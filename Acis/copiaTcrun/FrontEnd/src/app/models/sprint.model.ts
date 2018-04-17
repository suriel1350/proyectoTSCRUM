import { Project } from "./project.model";
import { Member } from "./member.model";

export class Sprint {
    constructor(
        public days: number,
        public comment: string,
        public updatedAt: Date,
        public createdAt: Date,
        public project_id: Number,
        public project?: Project,
        public id?: number,
    ) { }
}
