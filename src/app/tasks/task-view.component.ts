import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from './task-service';
import { filter, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { openCreateTaskDialog } from './create-task-dialog/create-task-dialog.component';
import { openEditTaskDialog } from './edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  tasks: Task[];
  private taskChangeSub: Subscription;

  constructor(private taskService: TaskService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskChangeSub = this.taskService.taskChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
  }

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }

  createNewTask() {
    openCreateTaskDialog(this.dialog)
    .pipe(
      filter(val => !! val)
      )
      .subscribe(
        val => console.log("new l value:", val)
      )
  }

  editTask(task: Task, index: number) {
    openEditTaskDialog(this.dialog, task, index)
    .pipe(
      filter(val => !! val)
    )
    .subscribe(
      val => console.log("Updated value:", val)
    )
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
