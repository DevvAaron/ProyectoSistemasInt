import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getLabs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/labs`);
  }

  getClips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clips`);
  }
}
