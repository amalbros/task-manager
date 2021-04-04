import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks;
priorities=['Low','Medium','High']
  constructor(private tasksService:TasksService) { }

  ngOnInit() {
    this.listTasks()
  }
  listTasks(){
    this.tasksService.listTasks().subscribe((data:any)=>{
      console.log("Data:",data)
      this.tasks=data.tasks;
    })
  }
  deleteTask(i){
    console.log("ID:",this.tasks[i].id)
    // this.tasksService.deleteTask({id:this.tasks[i].id}).subscribe((data:any)=>{
    //   console.log("Data:",data)
    // })
  }

}
