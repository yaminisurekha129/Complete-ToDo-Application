import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-task-app';

  public items: { task: string, isEditing: boolean }[] = [];

  public newTask: string='';

  ngOnInit() {
    const storedItems = localStorage.getItem('tasks');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      
    }
  }

  public addToList(){
    if(this.newTask != '') {
      this.items.push({task: this.newTask, isEditing:false});
      this.newTask = '';
      this.updateLocalStorage();
    }
  }

  public deleteTask(index:number) {
    this.items.splice(index, 1);
    this.updateLocalStorage();
  }

  public editTask(index:number){
    this.items[index].isEditing =!this.items[index].isEditing;

  }

  public saveEdit(index: number) {
    this.items[index].isEditing = false;
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.items));
  }

}
