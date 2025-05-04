import { Component, Inject } from '@angular/core';
import { ListItem } from '../list.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListService } from '../list.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Status } from 'src/app/shared/task.model';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.scss']
})
export class EditListDialogComponent {
  constructor(private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)  public data: { list: ListItem; id: number },
    private listService: ListService,
    private dialogRef: MatDialogRef<EditListDialogComponent>
    ) {}

    id: number;

    lists: ListItem[];

    options: Status[] = [
      { value: 'todo', viewValue: "Todo"},
      { value: 'doing', viewValue: "Doing"},
      { value: 'done', viewValue: "Done"},
    ];
  

    form = this._fb.group({
      name: [this.data.list?.name || '', Validators.required],
      tasks: this._fb.array(
        this.data.list?.tasks?.map(task => this.createTaskFormGroup(task)) ?? []
      )
    });

    ngOnInit() {
      this.lists = this.listService.getTaskLists();
    }

    onAddTask() {
      const taskGroup = this._fb.group({
        name: [''],
        description: [''],
        status: {value: null, viewValue: null},
      });
    
     this.tasks.push(taskGroup);
    }

    onDeleteTask(index: number): void {
      this.tasks.removeAt(index);
    }

    close() {
      this.dialogRef.close();
    }
  
    save() {
      const updatedList = new ListItem(
        this.form.value.name,
        this.form.value.tasks
      );

      this.listService.updateListItem(this.data.id, updatedList);
      this.dialogRef.close(updatedList);
    }

    compareStatusOptions(option1: any, option2: any): boolean {
      return option1 && option2 ? option1.value === option2.value : option1 === option2;
    }

    get tasks(): FormArray {
      return this.form.get('tasks') as FormArray;
    }

    private createTaskFormGroup(task?: Task): FormGroup {
      return this._fb.group({
        name: [task?.name ?? '', Validators.required],
        description: [task?.description ?? ''],
        status: [task?.status ?? null, Validators.required],
      });
    }
}


export function openEditListDialog(dialog: MatDialog, list: ListItem, id: number ) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;

  config.width = '60rem';

  config.data = {
    list, id
  }

  const dialogRef = dialog.open(EditListDialogComponent, config);

  return dialogRef.afterClosed();
}