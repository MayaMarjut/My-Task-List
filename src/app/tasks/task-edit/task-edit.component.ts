import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  id: number;
  editMode = false;
  taskForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService) {

  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onCancel() {
    console.log('I was cliked');
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if(this.editMode) {
      this.taskService.updateTask(this.id, this.taskForm.value);
    } else {
      this.taskService.addTask(this.taskForm.value);
    }
    // this.onCancel();
  }


  private initForm() {
    let taskName = '';
    let taskStatus = '';
    let taskDescription = '';

    if (this.editMode) {
      const task = this.taskService.getTask(this.id);
      taskName = task.name;
      taskStatus = task.status;
      taskDescription = task.description;
    }
    
    this.taskForm = new FormGroup({
      'name': new FormControl(taskName),
      'status': new FormControl(taskStatus),
      'description': new FormControl(taskDescription),
    });
  }
}
