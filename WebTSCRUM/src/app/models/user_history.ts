export class UserStory{
	constructor(
		public id: number,
		public weight: number,
        public scrum_board_status: number,
        public description: string,
        public priority: number,
        public sprint_id: number
	){}
}