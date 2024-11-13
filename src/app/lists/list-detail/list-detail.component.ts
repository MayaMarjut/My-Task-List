import { Component, OnInit } from '@angular/core';
import { TaskList } from '../list.model';
import { TaskListService } from '../taskList.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: TaskList;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private taskListService: TaskListService
    ) {

  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.list = this.taskListService.getTaskList(this.id);
      }
    )
  }

  onAddToListOfTasks() {
    this.taskListService.addTasksToListOfTasks(this.list.tasks);
  }

  onEditList() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteList() {
    this.taskListService.deleteTaskList(this.id);
    this.router.navigate(['/lists']);
    const returnToCreateB = document.getElementById('new-list-button');
    returnToCreateB?.focus();
  }
}