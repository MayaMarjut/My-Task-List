import { EventEmitter } from "@angular/core";
import { Task } from "./task.model";
import { Subject } from "rxjs";

export class TaskService {
	taskSelected = new EventEmitter<Task>;
	tasksChanged = new Subject<Task[]>;

	private tasks: Task[] = [
		new Task('Cleaning','OK', 'Clean the house'),
		new Task('Crogeries', 'OK', 'Need some crogeries for the pixxa tonight'),
	  ];

	  getTasks() {
		return this.tasks.slice();
	  }
	
	  getTask(index: number) {
		return this.tasks[index];
	  }

	  addTask(task: Task) {
		this.tasks.push(task)
		this.tasksChanged.next(this.tasks.slice());
	  } 

	  updateTask(index: number, newTask: Task) {
		this.tasks[index] = newTask;
		this.tasksChanged.next(this.tasks.slice());
	  }

	  deleteTask(index: number) {
		this.tasks.splice(index, 1);
		this.tasksChanged.next(this.tasks.slice());
	  }
}