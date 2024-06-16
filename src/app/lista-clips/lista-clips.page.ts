import { Component, OnInit } from '@angular/core';
import { ListaClipsService } from './lista-clips.service';

@Component({
  selector: 'app-lista-clips',
  templateUrl: './lista-clips.page.html',
  styleUrls: ['./lista-clips.page.scss'],
})
export class ListaClipsPage implements OnInit {
  usuarios: any[] = [];
  labs: any[] = [];
  clips: any[] = [];

  numLab: string = '';
  profesor: string = '';
  turno: string = '';
  curso: string = '';

  constructor(private listaClipsService: ListaClipsService) {}

  ngOnInit() {
    this.cargarLabs();
  }

  cargarLabs() {
    this.listaClipsService.getLabs().subscribe(data => {
      console.log('Labs:', data);
      this.labs = data;
    });
  }

  registrarLab() {
    const newLab = {
      NumLab: this.numLab,
      Profesor: this.profesor,
      Turno: this.turno,
      Curso: this.curso
    };
  
    this.listaClipsService.registrarLab(newLab).subscribe(res => {
      console.log('Respuesta del backend:', res);
      // Actualizar la lista después de registrar
      this.cargarLabs();
    });
  }
}
