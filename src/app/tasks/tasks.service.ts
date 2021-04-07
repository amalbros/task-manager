import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic OTVkYmIwZjBhYzg5NzgzMDNlNjRlMGEzOGMxNDk2MDQ6',
      'AuthToken': 'EzntRe0KVQJ1fvDm9GTrr6fApHUfrDIZ'
    })
  };
  const httpOptions2 = {
    headers: new HttpHeaders({
      'AuthToken': 'EzntRe0KVQJ1fvDm9GTrr6fApHUfrDIZ'
    })
  };
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url="https://devza.com/tests/tasks"
  constructor(private http:HttpClient) { }
  listTasks(){
    return this.http.get(this.url+"/list",httpOptions)
  }
  listUsers(){
    return this.http.get(this.url+"/listusers",httpOptions)
  }
  createTask(task){
    return this.http.post(this.url+"/create",task,httpOptions2)
  }
  deleteTask(task){
    return this.http.post(this.url+"/delete",task,httpOptions2)
  }
  updateTask(task){
    return this.http.post(this.url+"/update",task,httpOptions2)
  }
}
