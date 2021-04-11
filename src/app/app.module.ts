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
import { DateTimePickerModule } from 'ngx-datetime-picker';
import { NgxMatDatetimePickerModule , NgxMatNativeDateModule, NgxMatTimepickerModule} from 'ngx-mat-datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { taskPipe } from './task.pipe';
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ManageTasksComponent,
    ContactsComponent,
    AddTasksComponent,
    taskPipe,
    EditTasksComponent
  ],
  imports: [
    NgxMatNativeDateModule,
    MatMomentDateModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    DateTimePickerModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [ { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
