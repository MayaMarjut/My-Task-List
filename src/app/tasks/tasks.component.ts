import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from './task-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskChangeSub: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskChangeSub = this.taskService.taskChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }

  onFilterTasks(sorting: string) {
    this.tasks = this.taskService.getTasks();
    this.tasks = this.tasks.filter(p => p.status === sorting);
  }

  onEditTask(index: number) {
    this.taskService.startedEditing.next(index);
    const nameInputToFocus = document.getElementById('name');
    nameInputToFocus?.focus();
  }
}
