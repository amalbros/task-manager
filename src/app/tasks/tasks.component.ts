import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
tasks=[];
filteredTasks=[];
searchText="";
users;
useridToImg={};
date = new Date();  
dueDateString;
createdDateString;
priorities=[['Low',1],['Medium',2],['High',3],['All',4]]
isDesc: boolean = false;
priorityFilterForm=new FormGroup({
  priority:new FormControl()
});
  column: string = 'Priority';
  selectedPriority;
  constructor(private tasksService:TasksService) { 

  }

  ngOnInit() {
    this.listTasks()
    this.tasksService.listUsers().subscribe((data:any)=>{
      this.users=data.users
      for (let user of this.users){
        this.useridToImg[user.id.toString()]=user.picture
      
      }
      console.log("User id to Image:",this.useridToImg)
      console.log(this.users)
    })
  }
  search(){
    console.log('hello')
    if (this.searchText == null) {

     this.filteredTasks=this.tasks;
    }
    else{
      this.filteredTasks=this.filteredTasks.filter(task=> task.message.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)    
    }
    
  }
  clear(){
    this.selectedPriority=['All',4]
    this.filteredTasks=this.tasks
    this.dueDateString=''
    this.createdDateString=''
  }
  editEvent(event){
    console.log("Event:",event)
    this.filteredTasks[event.taskIndex]=event.task
  }
  filterBy(property){
    console.log("Property:",property)
    if (property=='dueDate'){
      this.filteredTasks=this.tasks.filter(task=>{

       
        return task.due_date.slice(0,10)===this.dueDateString
      })
    }
    if (property=='priority'){
      let selectedPriority=this.selectedPriority.split(",")[1]
      if (selectedPriority==4){
        this.filteredTasks=this.tasks
      }
      else{
        this.filteredTasks=this.tasks.filter(task=>task.priority==selectedPriority)
      }
      
    }

    if (property=='createdDate' && this.dueDateString==''){
      this.filteredTasks=this.tasks.filter(task=>{
        return task.created_on.slice(0,10)===this.createdDateString
      })
    }
    if (property=='createdDate' && this.dueDateString!=''){
      this.filteredTasks=this.filteredTasks.filter(task=>{
        return task.created_on.slice(0,10)===this.createdDateString
      })
    }

  }
 
  listTasks(){
    this.tasksService.listTasks().subscribe((data:any)=>{
      console.log("Data:",data)

      this.tasks=data.tasks;
      this.filteredTasks=data.tasks;
      console.log('Tasks:',this.tasks)
      console.log('Filtered Tasks:',this.filteredTasks)
    })
  }
  sort(name){
console.log("Name:",name)

this.isDesc = !this.isDesc; //change the direction    
    this.column = name;
    let direction = this.isDesc ? 1 : -1;
    if (direction==1){
      this.tasks.sort((a,b) =>{ let sname=a[name]
        let fname=b[name]
        console.log(sname)
      return  fname.localeCompare(sname) });
      console.log('Sort')
      this.filteredTasks.sort((a,b) => { let fname=a[name]
        let sname=b[name]
        console.log(fname)
        console.log(sname)
      return  fname.localeCompare(sname)});
    }
    else{
      this.tasks.sort((a,b) =>{ let sname=a[name]
        let fname=b[name]
        console.log(sname)
      return  fname.localeCompare(sname) });
      this.filteredTasks.sort((a,b) =>{ let sname=a[name]
        let fname=b[name]
        console.log(sname)
      return  fname.localeCompare(sname) });
    }
    // this.filteredTasks=this.filteredTasks
    console.log("Filtered Tasks After sorting:",this.filteredTasks)
    console.log("Tasks after sort:",this.tasks)
  }
  deleteTask(i){
    console.log('Index:',i)
    console.log('Tasks:',this.tasks)
    console.log('Filtered Tasks:',this.filteredTasks)
    console.log(this.filteredTasks[i].id)
    console.log("ID:",this.filteredTasks[i].id)
    let taskObj={taskid:this.filteredTasks[i].id}
    let form_data = new FormData();

for ( var key in taskObj ) {

    form_data.append(key, taskObj[key]);
    console.log("Key:",key)
    console.log("value:",taskObj[key])
    console.log("Form Data:",form_data)
}

    this.tasksService.deleteTask(form_data).subscribe((data:any)=>{
      console.log("Data:",data)
      // this.tasks.splice(i,1)
    this.filteredTasks.splice(i,1)
      console.log('Tasks after deletion',this.filteredTasks)
    })
  }
submit(event){
  console.log("New event:",event)
  this.tasks.push(event)
  this.filteredTasks=JSON.parse(JSON.stringify(this.tasks))
  console.log('Filtered tasks:',this.tasks)
}
}
