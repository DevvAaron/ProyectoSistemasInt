import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { TurnIncidentesService } from './turn-incidentes.service';

@Component({
  selector: 'app-turn-incidentes',
  templateUrl: './turn-incidentes.page.html',
  styleUrls: ['./turn-incidentes.page.scss'],
})
export class TurnIncidentesPage implements OnInit {

  turnosData: { [turno: string]: number } = {};

  constructor(
    private navCtrl: NavController,
    private turnIncidenteService: TurnIncidentesService
  ){
    // Registrar los módulos necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.generarGraficoTurnos();
    this.cargarTablaTurnos();
  }

  generarGraficoTurnos() {
    this.turnIncidenteService.getIncidentesPorTurnos().subscribe(
      (data: any[]) => {
        this.turnosData = this.aggregateData(data, 'Turno');
        const labels = Object.keys(this.turnosData);
        const valores = Object.values(this.turnosData);
        this.generateLineChart(labels, valores, 'Incidentes por Turnos');
      },
      (error) => {
        console.error('Error al obtener los datos de incidentes por turnos', error);
      }
    );
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

  generateLineChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: title,
              data: valores,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 24
                },
                color: 'black',
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false
              }
            }
          }
        });
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "line-chart".');
    }
  }

  cargarTablaTurnos() {
    this.turnIncidenteService.getIncidentesPorTurnos().subscribe(
      (data: any[]) => {
        const tableBody = document.querySelector('#turno-table tbody');
        if (tableBody) {
          tableBody.innerHTML = '';
          data.forEach((item, index) => {
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            cellId.textContent = (index + 1).toString();
            const cellTurno = document.createElement('td');
            cellTurno.textContent = item.Turno;
            row.appendChild(cellId);
            row.appendChild(cellTurno);
            tableBody.appendChild(row);
          });
        } else {
          console.error('No se encontró el elemento tbody de la tabla.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de incidentes por turnos para la tabla', error);
      }
    );
  }

  filtrarPorTurno(event: any) {
    const value = event.target.value;
    const tableBody = document.querySelector('#turno-table tbody');
    if (tableBody) {
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach((row) => {
        const turno = row.querySelector('td:nth-child(2)')?.textContent || '';
        if (turno.toLowerCase().includes(value.toLowerCase())) {
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
