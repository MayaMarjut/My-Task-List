import { Component, OnInit } from '@angular/core';
import { TaskList } from '../list.model';
import { TaskListService } from '../taskList.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists: TaskList[];

  constructor(private taskListService: TaskListService, 
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.taskListService.listChanged
      .subscribe(
        (lists: TaskList[]) => {
          this.lists = lists;
        }
      )
    this.lists = this.taskListService.getTaskLists();
  }

  // Dropdown menu navigointi
  onNewTaskList() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
