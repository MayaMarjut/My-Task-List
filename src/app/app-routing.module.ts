import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ListsComponent } from './lists/lists.component';
import { ListLandingComponent } from './lists/list-landing/list-landing.component';
import { ListDetailComponent } from './lists/list-detail/list-detail.component';
import { ListEditComponent } from './lists/list-edit/list-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  {path: 'lists', component: ListsComponent, children: [
    { path: '', component: ListLandingComponent},
    { path: 'new', component: ListEditComponent},
    { path: ':id', component: ListDetailComponent},
    { path: ':id/edit', component: ListEditComponent},
  ]},
  {path: 'tasks', component: TasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
