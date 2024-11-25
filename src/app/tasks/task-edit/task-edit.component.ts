import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task-service';
import { Task } from 'src/app/shared/task.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StatusOption } from 'src/app/shared/taskStatus.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) taskListForm: NgForm;
  subscription: Subscription;

  editMode = false;
  editedItemIndex: number;
  editedItem: Task;
  id: number;
  selectedOption?: StatusOption;
  stat1: StatusOption = 'Doing';
	stat2: StatusOption = 'Done';
	stat3: StatusOption = 'Todo';


    constructor(private taskService: TaskService) {}

    options = [
      { id: 1, value: this.stat1, label: 'ToDo'},
      { id: 2, value: this.stat2, label: 'Doing'},
      { id: 3, value: this.stat3, label: 'Done'},
    ];

  ngOnInit() {
  this.subscription = this.taskService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.taskService.getSingleTask(index);
          this.taskListForm.setValue({
            name: this.editedItem.name,
            desc: this.editedItem.description,
            options: this.editedItem.status,
          })
        }
      )
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    value.stats = this.selectedOption;
    const newTaskList = new Task(value.name, value.stats, value.desc);
    if(this.editMode){
      this.taskService.updateTask(this.editedItemIndex, newTaskList);
    } else {
      this.taskService.addSingleTask(newTaskList);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.taskListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.taskService.deleteTask(this.editedItemIndex);
    this.onClear();
  }
}
