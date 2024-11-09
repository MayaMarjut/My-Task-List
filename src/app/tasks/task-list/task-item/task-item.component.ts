import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() taskSelected = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit() {

  }

  onSelected() {
    this.taskSelected.emit();
  }
}
