import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AddtasksService } from './addtasks.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent  {
selectedDate;
date;
users;
// public formGroup = new FormGroup({
//   date: new FormControl(null, [Validators.required])
// })
// public dateControl = new FormControl(new Date());
public disabled = false;
public showSpinners = true;
priorities=[1,2,3]
// addTaskForm = new FormGroup({
//   task: new FormControl(null, [Validators.required]),
//   associatedWith: new FormControl(null, [Validators.required]),
//   priority: new FormControl(null, [Validators.required]),
//   date: new FormControl(null, [Validators.required]),
//   time: new FormControl(null, [Validators.required])
// });
  title = 'angularpopup';
  showModal: boolean;
  taskForm: FormGroup;
  submitted = false;
  
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
        task: ['', [Validators.required]],
        associatedWith: ['', [Validators.required, Validators.minLength(2)]],
        priority: ['', [Validators.required, Validators.minLength(2)]],
        dueDate: ['', [Validators.required,Validators.minLength(2)]],
        dueTime: ['', [Validators.required,Validators.minLength(2)]]
    });
    this.listUsers()
}
constructor(private addTasksService:AddtasksService,private formBuilder: FormBuilder){

}
listUsers(){
  this.addTasksService.listUsers().subscribe((data:any)=>{
    console.log("Users:",data)
    this.users=data.users
  })
}
// convenience getter for easy access to form fields
get f() { return this.taskForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
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
for(var pair of form_data.entries()){
  console.log(pair[0]+","+pair[1])
}

    console.log('Task Object:',taskObj)
    if (this.taskForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.addTasksService.createTask(form_data).subscribe(data=>{
        console.log("Create Task Response:",data)
      })
      console.log("Form Data:",form_data)
     
      this.showModal = false;
    } 
  
}

}
