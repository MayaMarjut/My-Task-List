import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {
  selectedTask: Task;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.taskService.taskSelected
      .subscribe(
        (task: Task) => {
          this.selectedTask = task;
        }
      );
  }
}
