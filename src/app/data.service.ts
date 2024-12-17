import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpclient: HttpClient) {}

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Fetch all tasks
  getData(): Observable<any> {
    const token = this.getToken();
    console.log('Return token',token);
    if (!token) {
      console.error('No token found');
    
    }
    const headers = new HttpHeaders({Authorization: `Bearer ${token}` });

    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable', { headers });
  }

  // Add a new task
  insertData(data: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.post('http://127.0.0.1:8000/api/taskTable', data, { headers });
  }

  // Fetch a task by ID
  getTaskById(id: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
     
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.get(`http://127.0.0.1:8000/api/taskTable/${id}`, { headers });
  }

  // Update a task by ID
  updateTask(id: any, data: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.put(`http://127.0.0.1:8000/api/taskTable/${id}`, data, { headers });
  }

  // Delete a task by ID
  deleteData(id: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
    
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.delete(`http://127.0.0.1:8000/api/taskTable/${id}`, { headers });
  }
}
