import { EventEmitter, Injectable } from "@angular/core";
import { TaskList } from "./list.model";
import { Subject } from "rxjs";
import { Task } from "../shared/task.model";
import { TaskService } from "../tasks/task-service";
import { StatusOption } from "../shared/taskStatus.model";

@Injectable()
export class TaskListService {
	listChanged = new Subject<TaskList[]>;
	stat1: StatusOption = 'Doing';
	stat2: StatusOption = 'Done';
	stat3: StatusOption = 'Todo';


	private lists: TaskList[] = [
		new TaskList('Cleaning List', [
			new Task('Clean windows', this.stat1, 'Clean the kitchen window'),
			new Task('Clean toilet', this.stat2, 'It is dirty'),
		]),
		new TaskList('Homework', [
			new Task('Study French',this.stat3, 'Read the chapters 1 and 2'),
			new Task('Study Math', this.stat1, 'Do the homework'),
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