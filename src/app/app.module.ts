import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './lists/list-view.component';
import { ListItemEditComponent } from './lists/list-item/list-item-edit/list-item-edit.component';
import { ListItemComponent } from './lists/list-item/list-item.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/task-service';
import { LisItemDetailComponent } from './lists/list-item/list-item-detail/list-item-detail.component';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListViewComponent,
    ListItemEditComponent,
    LisItemDetailComponent,
    ListItemComponent,
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
    MatOptionModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [TaskService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
