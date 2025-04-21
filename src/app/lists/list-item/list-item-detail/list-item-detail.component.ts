import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ListItem} from '../../list.model';
import { ListService } from '../../list.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-item-detail',
  templateUrl: './list-item-detail.component.html',
  styleUrls: ['./list-item-detail.component.scss']
})
export class LisItemDetailComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'description', 'status'];
  dataSource: MatTableDataSource<any>;
  list: ListItem;

  constructor(
    private listService: ListService
    ) {}

  @Input() id: number;

  ngOnInit(): void {
    this.list = this.listService.getListItem(this.id);

    const tableData = this.list.tasks.map((element, i) => ({
      name: element.name,
      index: i + 1,
      description: element.description,
      status: element.status
    }));
  
    this.dataSource = new MatTableDataSource(tableData);
  }

  // onAddToListOfTasks() {
  //   this.listService.addTasksToListOfTasks(this.list.tasks);
  // }
}