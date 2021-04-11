import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
import { NgxSpinnerModule } from "ngx-spinner";

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
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
