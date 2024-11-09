export class Task {
	public name: string;
	public status: string;
	public description: string;

	constructor(name: string, stat: string, desc: string) {
		this.name = name;
		this.status = stat;
		this.description = desc;
	}
}