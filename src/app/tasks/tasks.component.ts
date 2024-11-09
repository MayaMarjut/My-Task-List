import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  selectedTask: Task;
}
