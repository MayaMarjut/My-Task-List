import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Status, Task } from 'src/app/shared/task.model';
import { TaskService } from '../task-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent {
  constructor( private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private task: Task,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>){}

      form: FormGroup;

      options: Status[] = [
        { value: "todo", viewValue: "Doing"},
        { value: "doing", viewValue: "Done"},
        { value: "done", viewValue: "Todo"},
      ];

      ngOnInit() {
        this.form = this._fb.group({
          name: [this.task.name, Validators.required],
          description: this.task.description,
          status: this.task.status,
        })
      }

      close() {
        this.dialogRef.close();
      }
    
      save() {
        this.dialogRef.close(this.form.value);
        this.taskService.addSingleTask(this.form.value);
      }
}

export function openCreateTaskDialog(dialog: MatDialog) {
    const task = Task;
    const config = new MatDialogConfig();
  
    config.disableClose = true;
    config.autoFocus = true;
  
    config.width = '60rem';
  
    config.data = {
      ...task
    }
  
    const dialogRef = dialog.open(CreateTaskDialogComponent, config);
  
    return dialogRef.afterClosed();
}

