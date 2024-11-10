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
    let listName = '';
    let listStatus = '';
    let listDescription = '';
    let listTasks = new FormArray([]);

    if (this.editMode) {
      const list = this.taskListService.getTaskList(this.id);
      listName = list.name;
      listStatus = list.status;
      listDescription = list.description;
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
      'name': new FormControl(listName, Validators.required),
      'status': new FormControl(listStatus),
      'description': new FormControl(listDescription),
      'tasks': listTasks
    });
  }
}