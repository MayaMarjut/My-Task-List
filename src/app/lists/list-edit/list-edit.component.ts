import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListService } from '../taskList.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskList } from '../list.model';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss'],
})
export class ListEditComponent implements OnInit {
  id: number;
  editMode = false;
  taskForm: FormGroup;
  listName = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskListService: TaskListService) {

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

  onSubmit() {
    if(this.editMode) {
      this.taskListService.updateTaskList(this.id, this.taskForm.value);
    } else {
      this.taskListService.addTaskList(this.taskForm.value);
    }
    this.onCancel();
  }

  get controls() {
    return (<FormArray>this.taskForm.get('tasks')).controls;
  }

  onAddTask() {
    (<FormArray>this.taskForm.get('tasks')).push(
      new FormGroup({
        'name': new FormControl(null, [
          Validators.required, 
          Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let listTasks = new FormArray([]);

    if (this.editMode) {
      const list = this.taskListService.getTaskList(this.id);
      this.listName = list.name;
      if (list['tasks']){
        for (let task of list.tasks) {
          listTasks.push(
            new FormGroup({
              'name': new FormControl(task.name, [
                Validators.required, 
                Validators.pattern(/^[a-zA-Z0-9]*$/)])
            })
          );
        }
      }
    }
    
    this.taskForm = new FormGroup({
      'name': new FormControl(this.listName, Validators.required),
      'tasks': listTasks
    });
  }
}