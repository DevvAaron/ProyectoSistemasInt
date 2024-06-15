import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  usuarios: any = [];
  labs: any = [];
  clips: any = [];
  loadingUsuarios: boolean = true;
  loadingLabs: boolean = true;
  loadingClips: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsuarios();
    this.getLabs();
    this.getClips();
  }

  getUsuarios() {
    this.http.get<any>('http://localhost:3000/usuarios').subscribe((data) => {
      this.usuarios = data;
      this.loadingUsuarios = false;
    });
  }

  getLabs() {
    this.http.get<any>('http://localhost:3000/labs').subscribe((data) => {
      this.labs = data;
      this.loadingLabs = false;
    });
  }

  getClips() {
    this.http.get<any>('http://localhost:3000/clips').subscribe((data) => {
      this.clips = data;
      this.loadingClips = false;
    });
  }
}
