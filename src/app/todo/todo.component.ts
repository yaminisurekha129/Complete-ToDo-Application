import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: any;
  data: any;
  newTask: string = '';
  public items: { id: any, task: string, isEditing: boolean }[] = [];
  public editingIndex: number | null = null;


  constructor(private dataService: DataService) { }


  title='my-task-app';
  getTask() {
    this.dataService && this.dataService.getData().subscribe({
      next: (res) => {
        console.log('hjkk', res);
        if (Array.isArray(res.tasks)) {
          // If res is an array, proceed with mapping the data
          this.data = res.tasks;
          this.items = this.data.map((item: any) => ({
            id: item.id,
            task: item.task,
            isEditing: false
          }));
        } else {
          // Handle case where res is not an array
          console.error('Expected an array but got:', res);
          this.items = []; 
        }
      },
      error: (err) => {
        // Handle any errors that occur during the API call
        console.error('Error fetching tasks:', err);
        this.items = []; 
      }
    });
  }
  

  ngOnInit(): void {
    this.getTask();
  }

  insertData() {
   
    if (this.newTask.trim() !== '') {
      this.dataService.insertData({ task: this.newTask }).subscribe(() => {
        this.getTask();
        this.newTask = '';
      });
    }
  }
  deleteData(id: any) {
    this.dataService.deleteData(id).subscribe(() => {
      this.getTask()
    });
  }

  public addToList() {
    if (this.newTask != '') {
      this.items.push({ id: null, task: this.newTask, isEditing: false }); 
      this.newTask = '';
      this.getTask();
    }
  }

  public editTask(index: number) {
    this.items[index].isEditing = !this.items[index].isEditing;
    if (this.items[index].isEditing) {
      this.editingIndex = index;
    } else {
      this.editingIndex = null;
    }
  }

  public saveEdit(index: number) {
    const updatedTask = this.items[index].task;
    const id = this.items[index].id;
    if (id) { 
      this.dataService.updateTask(id, { task: updatedTask }).subscribe(() => {
        this.getTask();
      });
    }
  }
  private updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.items));
  }

}
