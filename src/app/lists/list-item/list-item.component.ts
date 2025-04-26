import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ListItem } from '../list.model';
import { ListService } from '../list.service';
import { MatDialog } from '@angular/material/dialog';
import { openEditListDialog } from '../edit-list-dialog/edit-list-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  readonly panelOpenState = signal(false);

  lists: ListItem[];
  id: number;

  constructor(private listService: ListService, 
    private dialog: MatDialog) {}

  ngOnInit() {
    this.listService.listChanged
      .subscribe(
        (lists: ListItem[]) => {
          this.lists = lists;
        }
      )
    this.lists = this.listService.getTaskLists();
  }

  onEditList(item: ListItem, index: number) {
    openEditListDialog(this.dialog, item, index)
    .pipe(
      filter(val => !! val)
    )
    .subscribe(() => {
      this.lists = this.listService.getTaskLists();
    });
  }

  onDeleteList(index: number) {
    this.listService.deleteListItem(index);
  }
  
}
