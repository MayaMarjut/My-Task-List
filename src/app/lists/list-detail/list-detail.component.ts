import { Component, OnInit } from '@angular/core';
import { ListItem} from '../list.model';
import { ListService } from '../list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { openEditListDialog } from '../edit-list-dialog/edit-list-dialog.component';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  list: ListItem;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private listService: ListService,
    private dialog: MatDialog,
    ) {}

  loadList() {
    this.list = this.listService.getListItem(this.id);
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.loadList();
      }
    )
  }

  onAddToListOfTasks() {
    this.listService.addTasksToListOfTasks(this.list.tasks);
  }

  onEditList() {
    openEditListDialog(this.dialog, this.list, this.id)
    .pipe(
      filter(val => !! val)
    )
    .subscribe(() => {
      this.loadList();
    });
  }

  onDeleteList() {
    this.listService.deleteListItem(this.id);
    this.router.navigate(['/lists']);
    const returnToCreateB = document.getElementById('new-list-button');
    returnToCreateB?.focus();
  }
}