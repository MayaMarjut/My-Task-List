import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskLandingComponent } from './tasks/task-landing/task-landing.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
  {path: 'tasks', component: TasksComponent, children: [
    { path: '', component: TaskLandingComponent},
    { path: 'new', component: TaskEditComponent},
    { path: ':id', component: TaskDetailComponent},
    { path: ':id/edit', component: TaskEditComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
