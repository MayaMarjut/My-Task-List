import { EventEmitter, Injectable } from "@angular/core";
import { ListItem } from "./list.model";
import { Subject } from "rxjs";
import { Task } from "../shared/task.model";
import { TaskService } from "../tasks/task-service";
import { StatusOption } from "../shared/taskStatus.model";

@Injectable()
export class ListService {
	listChanged = new Subject<ListItem[]>;
	stat1: StatusOption = 'Doing';
	stat2: StatusOption = 'Done';
	stat3: StatusOption = 'Todo';


	private lists: ListItem[] = [
		new ListItem('Cleaning List', [
			new Task('Clean windows', this.stat1, 'Clean the kitchen window'),
			new Task('Clean toilet', this.stat2, 'It is dirty'),
		]),
		new ListItem('Homework', [
			new Task('Study French',this.stat3, 'Read the chapters 1 and 2'),
			new Task('Study Math', this.stat1, 'Do the homework'),
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