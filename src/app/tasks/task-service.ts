import { Task } from "../shared/task.model";
import { Subject } from "rxjs";
import { StatusOption } from "../shared/taskStatus.model";

export class TaskService {
	taskChanged = new Subject<Task[]>();
	startedEditing = new Subject<number>();
	stat1: StatusOption = 'todo';
	stat2: StatusOption = 'done';

	private tasks: Task[] = [
		new Task('Tehtäväa', this.stat1, 'kuvaus'),
		new Task('Siivousa',this.stat2, 'kuvaus'),
	];

	getTasks() {
		return this.tasks.slice();
	}

	getSingleTask(index: number) {
		return this.tasks[index];
	}

	addSingleTask(Item: Task) {
		this.tasks.push(Item);
		this.taskChanged.next(this.tasks.slice());
	}

	addTasks(tasks: Task[]) {
		this.tasks.push(...tasks);
		this.taskChanged.next(this.tasks.slice());
	  }

	updateTask(index: number, newTask: Task){
		this.tasks[index] = newTask;
		this.taskChanged.next(this.tasks.slice());
	}

	deleteTask(index: number) {
		this.tasks.splice(index, 1);
		this.taskChanged.next(this.tasks.slice());
	}
}
