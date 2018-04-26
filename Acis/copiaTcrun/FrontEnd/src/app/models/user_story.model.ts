import { Sprint } from "./sprint.model";
import { Acceptance_criteria } from "./acceptance_criteria.model";
import { Task } from "./task.model";
export class User_story {
    constructor(
        public weight: number,
        public scrum_board_status: number,
        public description: string,
        public priority: number,
        public sprint_id: number,
        public sprint?: Sprint,
        public tasks?: Task[],
        public acceptance_criterias?: Acceptance_criteria[],
        public id?: number,
        
    ) { }
}