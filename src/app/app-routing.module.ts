import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './tasks/task-view.component';
import { ListViewComponent } from './lists/list-view.component';

const routes: Routes = [
  {path: 'lists', component: ListViewComponent },
  {path: 'tasks', component: TaskViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
