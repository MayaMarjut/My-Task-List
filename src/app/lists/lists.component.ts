import { Component, OnInit } from '@angular/core';
import { TaskListService } from './taskList.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  providers: [TaskListService]
})
export class ListsComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
