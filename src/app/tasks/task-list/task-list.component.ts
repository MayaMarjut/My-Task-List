import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Output() taskWasSelected = new EventEmitter<Task>();

  tasks: Task[] = [
    new Task('Cleaning', 'Clean the house'),
    new Task('Crogeries', 'Need some crogeries for the pixxa tonight'),
  ];

  constructor() {}

  ngOnInit() {

  }

  onTaskSelected(task: Task) {
      this.taskWasSelected.emit(task);
    }

}
