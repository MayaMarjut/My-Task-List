import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.task = this.taskService.getTask(this.id);
      }
    )
  }

  onEditTask() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteTask() {
    this.taskService.deleteTask(this.id);
    this.router.navigate(['/tasks']);
  }
}
