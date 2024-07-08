import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnIncidentesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getIncidentesPorTurnos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Labs`);
  }

}



