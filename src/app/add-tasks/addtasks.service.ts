import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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
export class AddtasksService {
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
  deleteTask(taskid){
    return this.http.post(this.url+"/delete",taskid,httpOptions)
  }
  updateTask(task){
    return this.http.post(this.url+"/update",task,httpOptions)
  }

}
