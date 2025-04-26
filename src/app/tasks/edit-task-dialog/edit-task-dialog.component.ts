import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task-service';
import { Task } from 'src/app/shared/task.model';
import { Status } from 'src/app/shared/taskStatus.model';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
  constructor(private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; id: number },
    private taskService: TaskService,
    private dialogRef: MatDialogRef<EditTaskDialogComponent>
  ) {}

  form: FormGroup;

    options: Status[] = [
      { value: 'todo', viewValue: 'ToDo'},
      { value: 'doing', viewValue: 'Doing'},
      { value: 'done', viewValue: 'Done'},
    ];

  ngOnInit() {
    this.form = this._fb.group({
      name: this.data.task.name,
      description: this.data.task.description,
      status: this.data.task.status,
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
  const updateTask = new Task(
    this.form.value.name,
    this.form.value.description,
    this.form.value.status
  )

    this.dialogRef.close(this.form.value);
    this.taskService.updateTask(this.data.id, updateTask);
  }

    get tasks(): FormArray {
      return this.form.get('tasks') as FormArray;
    }
}

export function openEditTaskDialog(dialog: MatDialog, task: Task, id: number) {
    const config = new MatDialogConfig();


      config.disableClose = true;
      config.autoFocus = true;
    
      config.width = '60rem';
    
      config.data = {
        task, id
      }
    
      const dialogRef = dialog.open(EditTaskDialogComponent, config);
    
      return dialogRef.afterClosed();
}


