import { EventEmitter, Injectable } from "@angular/core";
import { ListItem } from "./list.model";
import { Subject } from "rxjs";
import { Task, Status } from "../shared/task.model";
import { TaskService } from "../tasks/task-service";

@Injectable()
export class ListService {
	listChanged = new Subject<ListItem[]>;

    options: Status[] = [
		{ value: 'todo', viewValue: "Todo"},
		{ value: 'doing', viewValue: "Doing"},
		{ value: 'done', viewValue: "Done"},
	  ];


	private lists: ListItem[] = [
		new ListItem('Cleaning List', [
			new Task('Clean windows', 'Clean the kitchen window', this.options[1]),
			new Task('Clean toilet','It is dirty',this.options[0]),
		]),
		new ListItem('Homework', [
			new Task('Study French', 'Read the chapters 1 and 2', this.options[2]),
			new Task('Study Math','Do the homework', this.options[0]),
		]),
	  ];

	  constructor(private taskService: TaskService){

	  }

	  getTaskLists() {
		return this.lists.slice();
	  }

	
	  getListItem(index: number) {
		return this.lists[index];
	  }

	  addTasksToListOfTasks(tasks: Task[]) {
		this.taskService.addTasks(tasks);
	  }

	  addListItem(list: ListItem) {
		this.lists.push(list)
		this.listChanged.next(this.lists.slice());
	  } 

	  updateListItem(index: number, newList: ListItem) {
		this.lists[index] = newList;
		this.listChanged.next(this.lists.slice());
	  }

	  deleteListItem(index: number) {
		this.lists.splice(index, 1);
		this.listChanged.next(this.lists.slice());
	  }
}