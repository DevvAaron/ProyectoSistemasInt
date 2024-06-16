import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelControlService {
  private apiUrl = 'http://localhost:3000'; // Cambia la URL si tu backend está en un puerto diferente

  constructor(private http: HttpClient) {}

  getLabs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/labs`);
  }

  registrarLab(newLab: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar-lab`, newLab);
  }
}
