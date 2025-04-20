import { Component, OnInit } from '@angular/core';
import { ListItem} from '../list.model';
import { ListService } from '../list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private listService: ListService
    ) {

  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.list = this.listService.getListItem(this.id);
      }
    )
  }

  onAddToListOfTasks() {
    this.listService.addTasksToListOfTasks(this.list.tasks);
  }

  onEditList() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteList() {
    this.listService.deleteListItem(this.id);
    this.router.navigate(['/lists']);
    const returnToCreateB = document.getElementById('new-list-button');
    returnToCreateB?.focus();
  }
}