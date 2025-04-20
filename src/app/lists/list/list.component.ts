import { Component, OnInit } from '@angular/core';
import { ListItem } from '../list.model';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { openCreateListDialog } from '../create-list-dialog/create-list-dialog.component';
import { filter } from 'rxjs';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists: ListItem[];

  constructor(private listService: ListService, 
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.lists = this.listService.getTaskLists();
    this.listService.listChanged
      .subscribe(
        (lists: ListItem[]) => {
          this.lists = lists;
        }
      )
  }

  onNewListItem() {
    // this.router.navigate(['new'], {relativeTo: this.route})
    const list = {} as ListItem;

    openCreateListDialog(this.dialog, list)
    .pipe(
      filter(val => !! val)
    )
    .subscribe(
      val => console.log("new list value:", val)
    )
  }

}
