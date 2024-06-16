import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdministradorService {
  private apiUrl = 'http://localhost:3000'; // Cambia la URL si tu backend está en un puerto diferente

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  registrarUsuario(newUsuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar-usuario`, newUsuario);
  }
}
