import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ContactsComponent } from './contacts/contacts.component';
import {  HttpClientModule } from '@angular/common/http';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ManageTasksComponent,
    ContactsComponent,
    AddTasksComponent,
    EditTasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
