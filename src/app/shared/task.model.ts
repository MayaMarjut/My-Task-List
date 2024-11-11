import { StatusOption } from "./taskStatus.model";

export class Task {
  public name: string;
	public status: StatusOption;
	public description: string;

  constructor(name: string, stat: StatusOption, desc: string) {
    this.name = name;
    this.status = stat;
		this.description = desc;
  }
}