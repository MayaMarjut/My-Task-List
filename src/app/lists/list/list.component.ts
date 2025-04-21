import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list.model';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists: ListItem[];

  constructor(private listService: ListService, 
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.lists = this.listService.getTaskLists();
    this.listService.listChanged
      .subscribe(
        (lists: ListItem[]) => {
          this.lists = lists;
        }
      )
  }
}
