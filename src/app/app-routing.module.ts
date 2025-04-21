import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ListViewComponent } from './lists/list-view.component';
import { LisItemDetailComponent } from './lists/list-item/list-item-detail/list-item-detail.component';
import { ListItemEditComponent } from './lists/list-item/list-item-edit/list-item-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  {path: 'lists', component: ListViewComponent, children: [
  ]},
  {path: 'tasks', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
