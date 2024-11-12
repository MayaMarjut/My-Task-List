import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListService } from '../taskList.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskList } from '../list.model';
import { Observable, tap } from 'rxjs';

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
  lists: TaskList[];
  observer: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskListService: TaskListService,
    ) {}

    

  ngOnInit() {
    this.lists = this.taskListService.getTaskLists();
    this.observer = this.route.params.pipe(tap((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }))
  }


  matchingListName() { return (control: AbstractControl) => {
    const name: string = control.value;
    let matchingListName : boolean;

    console.log(this.editMode);

    if(!name) {
      return {  matchingListName: false };
    } 

    if(!this.editMode){
      this.lists.forEach(element => {
        if(element.name === name) {
          matchingListName = true;
        }
      });
    }
      return !matchingListName ? null : { matchingListName: false}
    } 
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
        'name': new FormControl(null),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let listTasks = new FormArray([]);

    if (this.editMode) {
      console.log('minä editoin');
      const list = this.taskListService.getTaskList(this.id);

      this.listName = list.name;
      if (list['tasks']){
        for (let task of list.tasks) {
          listTasks.push(
            new FormGroup({
              'name': new FormControl(task.name)
            })
          );
        }
      }
    }
    
    this.taskForm = new FormGroup({
      'name': new FormControl(this.listName, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/), this.matchingListName()]),
      'tasks': listTasks
    });
  }
    onDeleteTask(index: number) {
    (<FormArray>this.taskForm.get('tasks')).removeAt(index);
  }
}