import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Task } from './task';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private dataService: DataService){}
  ngOnInit(){
    this.getTask();
  }


  id:any;
  data:any;
  newTask:string='';
  // title = 'my-task-app';
  public items: { task: string, isEditing: boolean }[] = [];
  public task: string='';

  getTask(){
    this.dataService.getData().subscribe(res=>{
      this.data=res;
    })
  }

  insertData(){
    if(this.newTask.trim()!==''){
      this.dataService.insertData({task:this.newTask}).subscribe(res=>{
        this.getTask();
        this.newTask='';
  
      })
    }
  }



  deleteData(id:any){
    this.dataService.deleteData(id).subscribe(res=>{
      this.getTask();
    })
  }

  public addToList(){
    if(this.newTask!=''){
      this.items.push({task: this.newTask,isEditing:false});
      this.newTask='';
      this.updateLocalStorage();
    }
   }

   editingIndex: number | null=null;

  public editTask(index:number){
    this.items[index].isEditing =!this.items[index].isEditing;
    if(this.items[index].isEditing){
      this.editingIndex=index;
    }else{
      this.editingIndex=null;
    }

  }

  public saveEdit(index: number) {
    
    const updatedTask=this.items[index].task;
    this.dataService.updateTask(index,updatedTask).subscribe(()=>{
      this.getTask();
    })
}

  private updateLocalStorage(){
    localStorage.setItem('task',JSON.stringify(this.items));
  }



}
