import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders() {
    const token = this.authService.getUserInfo().token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getData(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  saveData(endpoint: string, record: any){
    return this.http.post(`${this.baseUrl}/${endpoint}`, record, { headers: this.getHeaders() });
  }

  updateData(endpoint: string, id: string, record: any){
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, record, { headers: this.getHeaders() });
  }
  
  getDataById(endpoint: string, id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }
  deleteData(endpoint: string, id: string){
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  searchRecords(endpoint: string, query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}?q=${query}`, { headers: this.getHeaders() });
  }
}