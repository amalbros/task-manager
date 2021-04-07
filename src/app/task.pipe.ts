import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'task' })
export class taskPipe implements PipeTransform {
  transform(tasks: any, searchText: any): any {
    if (searchText == null) return tasks;
    
    return tasks.filter(task=> task.message.toLowerCase().indexOf(searchText.toLowerCase()) > -1    
      
    )
  }
}