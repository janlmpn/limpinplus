import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; 

type LoginResponse = {
  token: string;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private userInfo: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<LoginResponse>(`${this.baseUrl}/users/login`, payload)
      .pipe(
        map(response => {
          if (response.token) {
            this.userInfo = { 
              username, 
              name: response.name,
              token: response.token 
            };
            localStorage.setItem('user', JSON.stringify(this.userInfo));
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Login failed', error);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.userInfo !== null || localStorage.getItem('user') !== null;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(): void {
    this.userInfo = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}