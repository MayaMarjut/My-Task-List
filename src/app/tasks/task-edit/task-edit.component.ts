import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task-service';
import { Task } from 'src/app/shared/task.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

    constructor(private taskService: TaskService) {

    }

    onAddItem(form: NgForm) {
      const value = form.value;
      const newTask = new Task(value.name);
      if(this.editMode) {
        this.taskService.updateTask(this.editedItemIndex, newTask);
      } else {
        this.taskService.addSingleTask(newTask);
      }
      this.editMode = false;
      form.reset();
    }

  ngOnInit() {
    this.taskService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.taskService.getSingleTask(index);
          this.taskListForm.setValue({
            name: this.editedItem.name,
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
    const newTaskList = new Task(value.name);
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
