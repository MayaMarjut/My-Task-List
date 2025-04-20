import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListItem} from '../list.model';
import { Observable, tap } from 'rxjs';
import { ListNameValidators } from 'src/app/shared/validators';
import { StatusOption } from 'src/app/shared/taskStatus.model';

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
  lists: ListItem[];

  stat1: StatusOption = 'Doing';
	stat2: StatusOption = 'Done';
	stat3: StatusOption = 'Todo';
  observer: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
    ) {}

    options = [
      { id: 1, value: this.stat1, label: 'ToDo'},
      { id: 2, value: this.stat2, label: 'Doing'},
      { id: 3, value: this.stat3, label: 'Done'},
    ];

  ngOnInit() {
    this.lists = this.listService.getTaskLists();
    this.observer = this.route.params.pipe(tap((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }))
  }

  matchingListName(listName: string) { return (control: AbstractControl) => {
    const name: string = control.value;
    let matchingListName : boolean;

    if(!name) {
      return null;
    } 
    if(name != listName) {
      this.lists.forEach(element => {
        if(element.name === name) {
          matchingListName = true;
        }
      });
    }
    return matchingListName ? {matchingListName: true} : null
    } 
  } 

  onSubmit() {
    if(this.editMode) {
      this.listService.updateListItem(this.id, this.taskForm.value);
      this.focusToEditButton();
    } else {
      this.listService.addListItem(this.taskForm.value);
      this.focusToCreateNewList();
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
        'description': new FormControl(null),
        'status': new FormControl(null),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    if (!this.editMode) {
      this.focusToCreateNewList();
    } else {
      this.focusToEditButton();
    }
  }

  focusToEditButton() {
    setTimeout(() => {
      const returnToEdit = document.getElementById('edit-list-btn');
      returnToEdit?.focus();
    }, 100);
  }

  focusToCreateNewList() {
    const returnToCreateB = document.getElementById('new-list-button');
    returnToCreateB?.focus();
  }

  private initForm() {
    let listTasks = new FormArray([]);

    if (this.editMode) {
      const list = this.listService.getListItem(this.id);

      this.listName = list.name;
      if (list['tasks']){
        for (let task of list.tasks) {
          listTasks.push(
            new FormGroup({
              'name': new FormControl(task.name),
              'description': new FormControl(task.description),
              'status': new FormControl(task.status),
            })
          );
        }
      }
    }
    
    this.taskForm = new FormGroup({
      'name': new FormControl(this.listName, [Validators.required, Validators.pattern(/^^[a-zA-Z0-9 ]+$/), this.matchingListName(this.listName), ListNameValidators.maxLengthValidator(60)]),
      'tasks': listTasks
    });
  }
    onDeleteTask(index: number) {
    (<FormArray>this.taskForm.get('tasks')).removeAt(index);
  }
}