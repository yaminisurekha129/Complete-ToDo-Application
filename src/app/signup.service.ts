import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpclient: HttpClient) { }

  // Signup method
  signup(data: any) {
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
}
