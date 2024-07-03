import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaClipsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  search(filters: any): Observable<any> {
    const url = `${this.apiUrl}/search`;
    return this.http.post(url, filters);
  }

  getLabs(filters: any = {}): Observable<any[]> {
    let params = new HttpParams();
    if (filters.profesor) {
      params = params.append('profesor', filters.profesor);
    }
    if (filters.laboratorio) {
      params = params.append('laboratorio', filters.laboratorio);
    }
    if (filters.turno) {
      params = params.append('turno', filters.turno);
    }
    return this.http.get<any[]>(`${this.apiUrl}/labs`, { params });
  }

  registrarLab(newLab: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar-lab`, newLab);
  }
}