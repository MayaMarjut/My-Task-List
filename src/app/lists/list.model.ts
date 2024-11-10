import { Task } from "../shared/task.model";

export class TaskList {
	public name: string;
	public status: string;
	public description: string;
	public tasks: Task[]

	constructor(name: string, stat: string, desc: string, tasks: Task[]) {
		this.name = name;
		this.status = stat;
		this.description = desc;
		this.tasks = tasks;
	}
}