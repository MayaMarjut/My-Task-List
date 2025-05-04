export class Task {
  public name: string;
	public description: string;
  public status: Status;

  constructor(name: string, desc: string, stat: Status) {
    this.name = name;
		this.description = desc;
    this.status = stat;
  }
}

export interface TaskTableRow {
  index: number;
  name: string;
  description: string;
  status: Status;
}

export type StatusOption  = 'Doing' | 'Done' | 'Todo';

export interface Status {
  value: string,
  viewValue: StatusOption,
}