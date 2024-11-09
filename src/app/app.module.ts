import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskItemComponent } from './tasks/task-list/task-item/task-item.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
