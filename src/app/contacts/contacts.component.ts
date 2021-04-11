import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {TasksService} from '../tasks/tasks.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
users;
  constructor(private tasksService:TasksService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.tasksService.listUsers().subscribe((data:any)=>{
      this.users=data.users
      console.log(this.users)
      this.spinner.hide()
    }
  )
  }

}
