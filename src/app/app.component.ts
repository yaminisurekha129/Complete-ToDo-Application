import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id: any;
  data: any;
  newTask: string = '';
  public items: { id: any, task: string, isEditing: boolean }[] = [];
  public editingIndex: number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.dataService.getData().subscribe(res => {
      this.data = res;
      this.items = this.data.map((item: any) => ({
        id: item.id,
        task: item.task,
        isEditing: false
      }));
    });
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
      this.getTask();
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
    if (id) { // Ensure the `id` is available
      this.dataService.updateTask(id, { task: updatedTask }).subscribe(() => {
        this.getTask();
      });
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.items));
  }
}
