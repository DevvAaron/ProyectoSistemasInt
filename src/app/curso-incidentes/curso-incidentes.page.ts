import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { CursoIncidentesService } from './curso-incidentes.service';

@Component({
  selector: 'app-curso-incidentes',
  templateUrl: './curso-incidentes.page.html',
  styleUrls: ['./curso-incidentes.page.scss'],
})
export class CursoIncidentesPage implements OnInit {

  cursosData: { [curso: string]: number } = {};
  
  constructor(
    private navCtrl: NavController,
    private cursoIncidenteService: CursoIncidentesService
  ) {
    // Registrar los módulos necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.generarGraficoCursos();
    this.cargarTablaCursos();
  }

  generarGraficoCursos() {
    this.cursoIncidenteService.getCursos().subscribe(
      (data: any[]) => {
        this.cursosData = this.aggregateData(data, 'Curso');
        this.generateBarChart(Object.keys(this.cursosData), Object.values(this.cursosData), 'Cursos con más incidentes');
      },
      (error) => {
        console.error('Error al obtener los datos de cursos', error);
      }
    );
  }

  generateBarChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('No se encontró el elemento canvas con ID "bar-chart".');
      return;
    }
  
    // Ajustar el tamaño del canvas
    canvas.width = 800; // Ancho en píxeles
    canvas.height = 600; // Alto en píxeles
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      return;
    }
  
    const backgroundColors = this.generarColoresAleatorios(labels.length);
    const borderColor = backgroundColors.map(color => color.replace('0.2', '1'));
  
    const myChart = new Chart(ctx, {
      type: 'bar', // Utilizar 'bar' en lugar de 'horizontalBar'
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: valores,
          backgroundColor: backgroundColors,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // Establecer el eje de índice en 'y' para un gráfico horizontal
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 24
            },
            color: 'black', // Cambiar el color del título a negro
            padding: {
              top: 0,
              bottom: 30
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            position: 'bottom'
          },
          y: {
            ticks: {
              callback: function(value) {
                return value.toString().substring(0, 5);
              }
            }
          }
        },
        layout: {
          padding: {
            top: 10
          }
        }
      }
    });
  }

  generarColoresAleatorios(cantidad: number): string[] {
    const colores: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colores.push(color);
    }
    return colores;
  }

  aggregateData(data: any[], field: string): { [key: string]: number } {
    const aggregatedData: { [key: string]: number } = {};
    data.forEach(item => {
      const label = item[field];
      if (aggregatedData[label]) {
        aggregatedData[label]++;
      } else {
        aggregatedData[label] = 1;
      }
    });
    return aggregatedData;
  }

  cargarTablaCursos() {
    this.cursoIncidenteService.getCursos().subscribe(
      (data: any[]) => {
        const tableBody = document.querySelector('#curso-table tbody');
        if (tableBody) {
          tableBody.innerHTML = '';
          data.forEach((item, index) => {
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            cellId.textContent = (index + 1).toString();
            const cellCurso = document.createElement('td');
            cellCurso.textContent = item.Curso;
            row.appendChild(cellId);
            row.appendChild(cellCurso);
            tableBody.appendChild(row);
          });
        } else {
          console.error('No se encontró el elemento tbody de la tabla.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de cursos para la tabla', error);
      }
    );
  }

  filtrarPorCurso(event: any) {
    const value = event.target.value;
    const tableBody = document.querySelector('#curso-table tbody');
    if (tableBody) {
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach((row) => {
        const curso = row.querySelector('td:nth-child(2)')?.textContent || '';
        if (curso.toLowerCase().includes(value.toLowerCase())) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    } else {
      console.error('No se encontró el elemento tbody de la tabla.');
    }
  }
  
  goToPanelControl(){
    this.navCtrl.navigateForward('/panel-control');
  }
  goToEstadisticas(){
    this.navCtrl.navigateForward('/estadisticas');
  }
  goToListaClips(){
    this.navCtrl.navigateForward('/lista-clips');
  }
}
