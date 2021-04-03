import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [{path: 'manage-tasks', component: ManageTasksComponent},
{path:'contacts',component:ContactsComponent},
 {path: '', component: TasksComponent},
{path: 'tasks', component: TasksComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
