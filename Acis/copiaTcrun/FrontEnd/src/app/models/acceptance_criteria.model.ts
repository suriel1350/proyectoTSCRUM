import { User_story } from "./user_story.model";

export class Acceptance_criteria {
    constructor(
        public name: string,
        public type: string,
        public user_story_id: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public id?: number,
    ) { }
}
