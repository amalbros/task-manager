import { Component ,OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TasksService} from '../tasks/tasks.service';
import { createAotUrlResolver } from '@angular/compiler';
@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css']
})
export class ManageTasksComponent implements OnInit {
 low=[]
medium=[]
high=[]
tasks;
lists=[];
users;
useridToImg={}
colors={'Low':"green",'Medium':'yellow','High':'red'}
  constructor(private tasksService:TasksService){

  }
  ngOnInit(): void {
    this.tasksService.listTasks().subscribe((data:any)=>{
      this.tasks=data.tasks
      console.log(this.tasks)
      console.log(data)
      this.low=this.tasks.filter(task=>task.priority=='1')
      this.medium=this.tasks.filter(task=>task.priority=='2')
      this.high=this.tasks.filter(task=>task.priority=='3')
      this.lists.push(['Low',this.low])
      this.lists.push(['Medium',this.medium])
      this.lists.push(['High',this.high])
      console.log("Lists:",this.lists)
    })
    this.tasksService.listUsers().subscribe((data:any)=>{
      this.users=data.users
      for (let user of this.users){
        this.useridToImg[user.id.toString()]=user.picture
      
      }
      console.log("User id to Image:",this.useridToImg)
      console.log(this.users)
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    let taskObj:any;
    taskObj=event.container.data[event.currentIndex]
    taskObj['priority']=(Number(event.container.id[event.container.id.length-1])+1).toString()
    taskObj['taskid']=taskObj['id']
    console.log('taskobj',taskObj)
    // delete taskObj['id']
    console.log('taskobj',taskObj)
    let taskData = new FormData();

for ( var key in taskObj ) {

    taskData.append(key, taskObj[key]);
  
}
    this.tasksService.updateTask(taskData).subscribe((data:any)=>{
      console.log(data)
      
    })
    
  }

}
