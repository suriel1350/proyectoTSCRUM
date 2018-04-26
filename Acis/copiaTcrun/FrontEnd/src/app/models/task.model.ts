import { User_story } from "./user_story.model";
import { Member } from "./member.model";

export class Task {
    constructor(
		public duration: number,
		public name: string,
		public completed: boolean,
		public user_story_id?: number,
		public user_story?: User_story,
		public members?: Member[],
        public id?: number,
    ) { }
}