import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ListItem } from '../list.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ListService } from '../list.service';
import { Task } from 'src/app/shared/task.model';
import { Status } from 'src/app/shared/taskStatus.model';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss']
})
export class CreateListDialogComponent implements OnInit {

  constructor(private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private list: ListItem,
    private listService: ListService,
    private dialogRef: MatDialogRef<CreateListDialogComponent>) {

      this.name = list.name;
  }

  name: string;

  lists: ListItem[];

  form: FormGroup;

  options: Status[] = [
    { value: 'todo', viewValue: 'ToDo'},
    { value: 'doing', viewValue: 'Doing'},
    { value: 'done', viewValue: 'Done'},
  ];

  ngOnInit() {
    this.lists = this.listService.getTaskLists();
    this.form = this._fb.group({
      name: [this.list?.name, [Validators.required, this.matchingListName(this.list.name)]],
      tasks: this._fb.array(
        this.list?.tasks?.map(task => this.createTaskFormGroup(task)) ?? []
      )
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.listService.addListItem(this.form.value);
  }

  matchingListName(currentName: string) { 
    return (control: AbstractControl): ValidationErrors | null => {
    const inputName = control.value;

    if(!inputName || inputName === currentName) {
      return null;
    } 

    const nameExists = this.lists.some(list => list.name === inputName);
    return nameExists ? { matchingListName: true } : null;
    } 
  } 

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  private createTaskFormGroup(task?: Task): FormGroup {
    return this._fb.group({
      name: [task?.name ?? '', Validators.required],
      status: [task?.status ?? null, Validators.required],
      description: [task?.description ?? '']
    });
  }

  onAddTask() {
    const taskGroup = this._fb.group({
      name: [''],
      description: [''],
      status: [null],
    });
  
   this.tasks.push(taskGroup);
  }

  onDeleteTask(index: number): void {
    this.tasks.removeAt(index);
  }
}

export function openCreateListDialog(dialog: MatDialog, list: ListItem ) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;

  config.width = '60rem';

  config.data = {
    ...list
  }

  const dialogRef = dialog.open(CreateListDialogComponent, config);

  return dialogRef.afterClosed();
}