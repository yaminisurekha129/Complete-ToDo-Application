import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpclient: HttpClient) {}

  getData(){
    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable');
  }

  insertData(data:any){
    return this.httpclient.post('http://127.0.0.1:8000/api/taskTable',data);

  }

  getTaskById(id:any){
    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable/'+id);
  }

  updateTask(id:any,data:any){
    return this.httpclient.put('http://127.0.0.1:8000/api/taskTable/'+id,data);
  }

  deleteData(id:any){
    return this.httpclient.delete('http://127.0.0.1:8000/api/taskTable/'+id);
  }

 

}
