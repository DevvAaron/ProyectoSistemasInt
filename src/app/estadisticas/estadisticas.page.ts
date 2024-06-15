import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from './estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  usuarios: any[] = [];
  labs: any[] = [];
  clips: any[] = [];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarLabs();
    this.cargarClips();
  }

  cargarUsuarios() {
    this.estadisticasService.getUsuarios().subscribe(data => {
      console.log('Usuarios:', data);
      this.usuarios = data;
    });
  }

  cargarLabs() {
    this.estadisticasService.getLabs().subscribe(data => {
      console.log('Labs:', data);
      this.labs = data;
    });
  }

  cargarClips() {
    this.estadisticasService.getClips().subscribe(data => {
      console.log('Clips:', data);
      this.clips = data;
    });
  }
}
