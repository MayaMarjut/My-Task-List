import { EventEmitter, Injectable } from "@angular/core";
import { TaskList } from "./list.model";
import { Subject } from "rxjs";
import { Task } from "../shared/task.model";
import { TaskService } from "../tasks/task-service";

@Injectable()
export class TaskListService {
	listChanged = new Subject<TaskList[]>;

	private lists: TaskList[] = [
		new TaskList('CleaningList','OK', 'description', [
			new Task('Clean windows'),
			new Task('Clean toilet'),
		]),
		new TaskList('Crogeries', 'OK', 'Need some crogeries for the pixxa tonight', [
			new Task('Buy toilet paper'),
			new Task('Buy food'),
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