import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;

  ngOnInit(): void {}
}
