import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task, TaskTableRow } from '../shared/task.model';
import { TaskService } from './task-service';
import { filter, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { openCreateTaskDialog } from './create-task-dialog/create-task-dialog.component';
import { openEditTaskDialog } from './edit-task-dialog/edit-task-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-tasks',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, AfterViewInit, OnDestroy {
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['index', 'name', 'description', 'status', 'edit'];

  taskSource = new MatTableDataSource<TaskTableRow>([]);
  tasks: Task[];
  private taskChangeSub: Subscription;

  constructor(private taskService: TaskService, 
    private dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadTaskTableData(this.taskService.getTasks());
    this.taskChangeSub = this.taskService.taskChanged
      .subscribe(
        (tasks: Task[]) => {
          this.loadTaskTableData(tasks);
        }
      );

  }

  ngAfterViewInit() {
    this.taskSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.taskChangeSub.unsubscribe();
  }

  createNewTask() {
    openCreateTaskDialog(this.dialog)
    .pipe(
      filter(val => !! val)
      )
      .subscribe(
        val => console.log("new l value:", val)
      )
  }

  editTask(task: Task, index: number) {
    openEditTaskDialog(this.dialog, task, index)
    .pipe(
      filter(val => !! val)
    )
    .subscribe(() => {
      this.loadTaskTableData(this.taskService.getTasks());
    }
    )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

    private loadTaskTableData(tasks: Task[]) {
      this.tasks = tasks;
      const tableData: TaskTableRow[] = tasks.map((task, i) => ({
        index: i,
        name: task.name,
        description: task.description,
        status: task.status
      }));
      this.taskSource.data = tableData;

      // Make Task status sorting possible with a custom sortingDataAccessor function that can be set to 
      // override the default data accessor on the MatTableDataSource.
      this.taskSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'status': return item.status.value;
          default: return item[property];
        }
      };
    }
  }