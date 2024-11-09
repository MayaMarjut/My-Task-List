import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService, 
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      )
    this.tasks = this.taskService.getTasks();
  }

  createNewTask() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
