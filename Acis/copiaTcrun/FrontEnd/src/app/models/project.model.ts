import { Technology } from "./technology.model";
import { Sprint } from "./sprint.model";
import { Member } from "./member.model";

export class Project {
    constructor(
        public vision: string,
        public name: string,
        public begin_date: Date,
        public end_date: Date,
        public background: string,
        public risks: string,
        public reach: string,
        public scrum_master_id: string,
        public scrum_master?: Member,
        public updatedAt?: Date,
        public createdAt?: Date,
        public sprints?: Sprint[],
        public members?: Member[],
        public technologies?: Technology[],
        public id?: number,
    ) { }
}
