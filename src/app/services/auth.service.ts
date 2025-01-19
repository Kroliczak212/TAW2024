import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Token } from '../models/token';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}


  authenticate(credentials: any) {
    const localStorage = this.document.defaultView?.localStorage;
    return this.http.post(this.url + '/user/auth', {
      login: credentials.login,
      password: credentials.password
    }).pipe(
      map((result: Token | any) => {
        if (result && result.token) {
          localStorage?.setItem('token', result.token);
          return true;
        }
        return false;
      })
    );
  }

  createOrUpdate(credentials: any) {
    return this.http.post(this.url + '/user/create', credentials);
  }

  logout() {
    const token = this.getToken();
    const userId = this.currentUser?.userId;
  
    if (!token || !userId) {
      console.error('Brak tokenu lub userId.');
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.http.delete(`${this.url}/user/logout/${userId}`, { headers }).pipe(
      map(() => {
        // Usuń token z localStorage po wylogowaniu
        this.document.defaultView?.localStorage.removeItem('token');
      })
    );
  }
  
  

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !new JwtHelperService().isTokenExpired(token) : false;
  }
  
  

  get currentUser() {
    const token = this.getToken();
    return token ? new JwtHelperService().decodeToken(token) : null;
  }

  getToken() {
    const localStorage = this.document.defaultView?.localStorage;
    return localStorage?.getItem('token');
  }
}
