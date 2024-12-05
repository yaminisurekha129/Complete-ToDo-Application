import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpclient: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
   
  getData():Observable<any> {
    const token = this.getToken();
    console.log("coming", token);
    
    if (!token) {
      console.error('No token found');
      //return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable', {
      headers
    });
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
