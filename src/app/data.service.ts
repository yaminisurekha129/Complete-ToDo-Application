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
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpclient.post('http://127.0.0.1:8000/api/taskTable',data,{headers});
  }

  getTaskById(id:any){
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable/'+id,{headers});
  }

  
  updateTask(id:any,data:any){
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.put('http://127.0.0.1:8000/api/taskTable/'+id,data,{headers});
  }

  deleteData(id:any){
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpclient.delete('http://127.0.0.1:8000/api/taskTable/'+id,{headers});
    
  }

 

}
