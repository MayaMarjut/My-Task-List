import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListLandingComponent } from './lists/list-landing/list-landing.component';
import { ListsComponent } from './lists/lists.component';
import { ListEditComponent } from './lists/list-edit/list-edit.component';
import { ListItemComponent } from './lists/list/list-item/list-item.component';
import { ListComponent } from './lists/list/list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/task-service';
import { DropdownDirective } from './shared/dropdown.directive';
import { ListDetailComponent } from './lists/list-detail/list-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListLandingComponent,
    ListsComponent,
    ListEditComponent,
    ListItemComponent,
    ListDetailComponent,
    ListComponent,
    TaskEditComponent,
    TaskItemComponent,
    TasksComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
