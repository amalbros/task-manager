import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
dateCheckStatus=false;
@Output() createdTask= new EventEmitter();


public disabled = false;
public showSpinners = true;
priorities=[1,2,3]

  title = 'angularpopup';
  showModal: boolean;
  taskForm: FormGroup;
  submitted = false;
  submitStatus=false;
  
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
        associatedWith: ['', [Validators.required]],
        priority: ['', [Validators.required]],
        dueDate: ['', [Validators.required,this.dateCheck]],
        dueTime: ['', [Validators.required]]
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
clearForm() {

  this.taskForm.reset({
    task: '',
    associatedWith: '',
    priority: '',
    dueDate: '',
    dueTime: ''
       });
  }
  dateCheck(control:FormControl){
    let dueDate=control.value;
    console.log('Validator:',dueDate)
    let todaysDate=new Date()
   let createdDate=todaysDate.getFullYear()+'-'+(Number(todaysDate.getMonth())+1).toString()+'-'+todaysDate.getDate()
   let createdDateList=createdDate.split('-')
   let dueDateList=dueDate.split('-')                                                                                                                            
    let createdYear=Number(createdDateList[0]);
    let dueYear=Number(dueDateList[0]);
 
    let createdDay=Number(createdDateList[2]);
    let dueDay=Number(dueDateList[2]);
    let createdMonth=Number(createdDateList[1]);
    let dueMonth=Number(dueDateList[1]);
    if (createdYear > dueYear) {
    
     return {'dateCheck':true}
  } else if (createdMonth > dueMonth && createdYear >= dueYear) {

    return {'dateCheck':true}
  } else if (createdDay > dueDay && createdMonth >= dueMonth && createdYear >= dueYear) {

    return {'dateCheck':true}
  }
 
  return null
  }
onSubmit() {
    this.submitted = true;
    console.log('Date:')
   console.log(this.taskForm.controls.dueDate.value)
    // stop here if form is invalid
    var taskObj={
      "message":this.taskForm.controls.task.value,
      "due_date":this.taskForm.controls.dueDate.value+" "+this.taskForm.controls.dueTime.value+":00",
      "priority":this.taskForm.controls.priority.value,
      "assigned_to":this.taskForm.controls.associatedWith.value.id
    }
    var taskData = new FormData();

for ( var key in taskObj ) {

    taskData.append(key, taskObj[key]);
    console.log("Key:",key)
    console.log("value:",taskObj[key])
    console.log("Form Data:",taskData)
}
// for(var pair of form_data.entries()){
//   console.log(pair[0]+","+pair[1])
// }

    console.log('Task Object:',taskObj)
    if (this.taskForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.submitStatus=true;
        setTimeout(function(){  }, 10000);
      this.addTasksService.createTask(taskData).subscribe((data:any)=>{
        taskObj['id']=data.taskid
        taskObj['priority']=taskObj['priority'].toString()
        taskObj['assigned_name']=this.taskForm.controls.associatedWith.value.name
        let date = new Date();  
        let date_string=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+ date.getHours()+':'
        if (Number(date.getMinutes())<10){
          date_string+='0'+date.getMinutes()+':'
        }
        else{
          date_string+=date.getMinutes()+':'
        }
        if (Number(date.getSeconds()<10)){
          date_string+='0'+date.getSeconds()
        }
        else{
          date_string+=date.getSeconds()
        }
        taskObj['created_on']=date_string
        this.createdTask.emit(taskObj)
        console.log("Create Task Response:",data)
        // this.taskForm.reset();
        this.clearForm()
        this.showModal = false;
        this.submitStatus=false;
        this.submitted=false;
        
      })
      console.log("Form Data:",taskData)
     
      
    } 
  
}

}
