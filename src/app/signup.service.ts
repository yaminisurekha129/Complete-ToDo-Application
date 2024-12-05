import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient: HttpClient) { }

  // Signup method
  insertDetail(data: any) {
    return this.httpclient.post('http://127.0.0.1:8000/api/signup', data);
  }

  // Login method
  login(credentials: { email: string, password: string }) {
    return this.httpclient.post('http://127.0.0.1:8000/api/login', credentials);
  }

  // Store token in local storage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Remove token from local storage
  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }

  // Get all tasks (requires authentication)
  // getTasks() {
  //   const token = this.getToken();
  //   return token ? this.httpclient.get('http://127.0.0.1:8000/api/taskTable', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }) : null;
  // }

  
  getTasks() {
    const token = this.getToken();
    
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    
    return this.httpclient.get('http://127.0.0.1:8000/api/taskTable', {
      headers
    });
  }
  

  // Create a new task (requires authentication)
  createTask(data: any) {
    const token = this.getToken();
    return token ? this.httpclient.post('http://127.0.0.1:8000/api/taskTable', data, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }

  // Update an existing task by ID (requires authentication)
  updateTask(id: any, data: any) {
    const token = this.getToken();
    return token ? this.httpclient.put(`http://127.0.0.1:8000/api/taskTable/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }

  // Delete a task by ID (requires authentication)
  deleteTask(id: any) {
    const token = this.getToken();
    return token ? this.httpclient.delete(`http://127.0.0.1:8000/api/taskTable/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }) : null;
  }
}
