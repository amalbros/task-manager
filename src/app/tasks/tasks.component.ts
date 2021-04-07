import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks;
searchText="";
priorities=['Low','Medium','High']
isDesc: boolean = false;
  column: string = 'Priority';
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
  sort(name){
console.log("Name:",name)
console.log(this.tasks)
this.isDesc = !this.isDesc; //change the direction    
    this.column = name;
    let direction = this.isDesc ? 1 : -1;
    if (direction==1){
      this.tasks.sort((a,b) => { let fname=a[name]
        let sname=b[name]
        console.log(fname)
      return  fname.localeCompare(sname)});
    }
    else{
      this.tasks.sort((a,b) =>{ let sname=a[name]
        let fname=b[name]
        console.log(sname)
      return  fname.localeCompare(sname) });
    }
   
  }
  deleteTask(i){
    this.tasks.splice(i,1)
    console.log("ID:",this.tasks[i].id)
    let taskObj={taskid:this.tasks[i].id}
    let form_data = new FormData();

for ( var key in taskObj ) {

    form_data.append(key, taskObj[key]);
    console.log("Key:",key)
    console.log("value:",taskObj[key])
    console.log("Form Data:",form_data)
}
for(var pair of form_data.entries()){
  console.log(pair[0]+","+pair[1])
}
    this.tasksService.deleteTask(form_data).subscribe((data:any)=>{
      console.log("Data:",data)
    })
  }

}
