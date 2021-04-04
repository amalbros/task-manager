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
priorities=["Low","Medium","High"]
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
    let taskObj={
      "message":this.taskForm.controls.task.value,
      "due_date":this.taskForm.controls.dueDate.value+" "+this.taskForm.controls.dueTime.value,
      "priority":this.taskForm.controls.priority.value,
      "assigned_to":this.taskForm.controls.associatedWith.value.id
    }
    console.log('Task Object:',taskObj)
    if (this.taskForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      // this.addTasksService.createTask(taskObj).subscribe(data=>{
      //   console.log("Create Task Response:",data)
      // })
      this.showModal = false;
    } 
  
}

}
