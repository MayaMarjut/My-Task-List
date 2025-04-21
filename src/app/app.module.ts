import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/task-service';
import { ListDetailComponent } from './lists/list-detail/list-detail.component';
import { ListService } from './lists/list.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateListDialogComponent } from './lists/create-list-dialog/create-list-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { EditListDialogComponent } from './lists/edit-list-dialog/edit-list-dialog.component';

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
    TasksComponent,
    CreateListDialogComponent,
    EditListDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule
  ],
  providers: [TaskService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
