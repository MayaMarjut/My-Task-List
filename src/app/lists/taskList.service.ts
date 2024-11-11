import { EventEmitter, Injectable } from "@angular/core";
import { TaskList } from "./list.model";
import { Subject } from "rxjs";
import { Task } from "../shared/task.model";
import { TaskService } from "../tasks/task-service";
import { StatusOption } from "../shared/taskStatus.model";

@Injectable()
export class TaskListService {
	listChanged = new Subject<TaskList[]>;
	stat1: StatusOption = 'doing';
	stat2: StatusOption = 'done';
	stat3: StatusOption = 'todo';


	private lists: TaskList[] = [
		new TaskList('CleaningList', [
			new Task('Clean windows', this.stat1, 'description'),
			new Task('Clean toilet', this.stat2, 'description'),
		]),
		new TaskList('Crogeries', [
			new Task('Buy toilet paper',this.stat3, 'Need some crogeries for the pixxa tonight'),
			new Task('Buy food', this.stat1, 'Need some crogeries for the pixxa tonight'),
		]),
	  ];

	  constructor(private taskService: TaskService){

	  }

	  getTaskLists() {
		return this.lists.slice();
	  }

	
	  getTaskList(index: number) {
		return this.lists[index];
	  }

	  addTasksToListOfTasks(tasks: Task[]) {
		this.taskService.addTasks(tasks);
	  }

	  addTaskList(list: TaskList) {
		this.lists.push(list)
		this.listChanged.next(this.lists.slice());
	  } 

	  updateTaskList(index: number, newList: TaskList) {
		this.lists[index] = newList;
		this.listChanged.next(this.lists.slice());
	  }

	  deleteTaskList(index: number) {
		this.lists.splice(index, 1);
		this.listChanged.next(this.lists.slice());
	  }
}