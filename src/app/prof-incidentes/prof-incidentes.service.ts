import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfIncidentesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Labs`);
  }
}
