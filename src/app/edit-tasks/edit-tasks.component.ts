
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { TasksService } from '../tasks/tasks.service';
@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent implements OnInit {

  @Input() task;
  @Input() taskIndex;
  @Output() editTask=new EventEmitter();
  public disabled = false;
public showSpinners = true;
submitStatus=false
priorities=['1','2','3']
useridToName={}
  title = 'angularpopup';
  showModal: boolean;
  taskForm: FormGroup;
  submitted = false;
  users;
  
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    console.log('Task in Show:',this.task)
    this.taskForm.patchValue({
      taskid:this.task.id,
      task:this.task.message,
      associateWith:this.task.assigned_to,
      priority:this.task.priority,
      dueDate:this.task.due_date.split(" ",2)[0],
      dueTime:this.task.due_date.split(" ",2)[1]
    });
    this.taskForm.get('taskid').disable()
    this.taskForm.get('priority').setValue(this.task.priority);
    this.taskForm.get('associatedWith').setValue(this.users[(Number(this.task.assigned_to)-1)])
    console.log(this.taskForm)
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      taskid:['',[Validators.required]],
        task: ['', [Validators.required]],
        associatedWith: ['', [Validators.required]],
        priority: ['', [Validators.required ]],
        dueDate: ['', [Validators.required]],
        dueTime: ['', [Validators.required]]
    });
    this.listUsers()
    console.log('Task:',this.task)
   
}
constructor(private TasksService:TasksService,private formBuilder: FormBuilder){

}
listUsers(){
  this.TasksService.listUsers().subscribe((data:any)=>{
    console.log("Users:",data)
    this.users=data.users
    for (let user of this.users){
      this.useridToName[user.id]=user.name
    }
  
  })
}
// convenience getter for easy access to form fields
get f() { return this.taskForm.controls; }
onSubmit() {
    this.submitted = true;
    var taskObj={
      "taskid":this.taskForm.controls.taskid.value,
      "message":this.taskForm.controls.task.value,
      "due_date":this.taskForm.controls.dueDate.value+" "+this.taskForm.controls.dueTime.value,
      "priority":this.taskForm.controls.priority.value,
      "assigned_to":this.taskForm.controls.associatedWith.value.id
    }
    if (taskObj['due_date']!=this.task.due_date){
      taskObj['due_date']=taskObj['due_date']+':00'
    }
    var taskData = new FormData();

for ( var key in taskObj ) {

    taskData.append(key, taskObj[key]);
    console.log("Key:",key)
    console.log("value:",taskObj[key])
    console.log("Form Data:",taskData)
}

    console.log('Task Object:',taskObj)
    if (this.taskForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      
      this.submitStatus=true;
      setTimeout(function(){},10000)
      this.TasksService.updateTask(taskData).subscribe((data:any)=>{
        taskObj['created_on']=this.task.created_on
        taskObj['assigned_name']=this.useridToName[taskObj['assigned_to']]
        taskObj['id']=taskObj['taskid']
        this.editTask.emit({'task':taskObj,'taskIndex':this.taskIndex})
        this.submitStatus=false;
        this.showModal = false;
      })
      console.log("Form Data:",taskData)
     
    } 
  
}

}
