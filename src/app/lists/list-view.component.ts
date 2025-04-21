import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { openCreateListDialog } from './create-list-dialog/create-list-dialog.component';
import { ListItem } from './list.model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  constructor(
    private dialog: MatDialog) {}

  ngOnInit() {}

  onNewListItem() {
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
