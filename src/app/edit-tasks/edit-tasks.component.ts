
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
  public disabled = false;
public showSpinners = true;
priorities=['1','2','3']

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
        associatedWith: ['', [Validators.required, Validators.minLength(2)]],
        priority: ['', [Validators.required, Validators.minLength(2)]],
        dueDate: ['', [Validators.required,Validators.minLength(2)]],
        dueTime: ['', [Validators.required,Validators.minLength(2)]]
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
  })
}
// convenience getter for easy access to form fields
get f() { return this.taskForm.controls; }
onSubmit() {
    this.submitted = true;
    var taskObj={
      "message":this.taskForm.controls.task.value,
      "due_date":this.taskForm.controls.dueDate.value+" "+this.taskForm.controls.dueTime.value+":00",
      "priority":this.taskForm.controls.priority.value,
      "assigned_to":this.taskForm.controls.associatedWith.value.id
    }
    var form_data = new FormData();

for ( var key in taskObj ) {

    form_data.append(key, taskObj[key]);
    console.log("Key:",key)
    console.log("value:",taskObj[key])
    console.log("Form Data:",form_data)
}

    console.log('Task Object:',taskObj)
    if (this.taskForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      
      this.TasksService.updateTask(form_data).subscribe((data:any)=>{
       
      })
      console.log("Form Data:",form_data)
     
      this.showModal = false;
    } 
  
}

}
