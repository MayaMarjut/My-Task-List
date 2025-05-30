import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './lists/list-view.component';
import { ListItemComponent } from './lists/list-item/list-item.component';
import { TaskViewComponent } from './tasks/task-view.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { CreateTaskDialogComponent } from './tasks/create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './tasks/edit-task-dialog/edit-task-dialog.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    LisItemDetailComponent,
    ListItemComponent,
    TaskViewComponent,
    CreateListDialogComponent,
    EditListDialogComponent,
    CreateTaskDialogComponent,
    EditTaskDialogComponent,
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
    MatTableModule,
    MatTabsModule,
    MatSortModule
  ],
  providers: [TaskService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
