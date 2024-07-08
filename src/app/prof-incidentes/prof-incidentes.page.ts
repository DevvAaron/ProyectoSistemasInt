import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ProfIncidentesService } from './prof-incidentes.service';

@Component({
  selector: 'app-prof-incidentes',
  templateUrl: './prof-incidentes.page.html',
  styleUrls: ['./prof-incidentes.page.scss'],
})
export class ProfIncidentesPage implements OnInit {
  profesoresData: { [profesor: string]: number } = {};

  constructor(
    private navCtrl: NavController,
    private profincidentesService: ProfIncidentesService
  ) {
    // Registrar los módulos necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.generarGraficoProfesores();
    this.cargarTablaProfesores();
  }

  generarGraficoProfesores() {
    this.profincidentesService.getProfesores().subscribe(
      (data: any[]) => {
        this.profesoresData = this.aggregateData(data, 'Profesor');
        const labels = Object.keys(this.profesoresData);
        const valores = Object.values(this.profesoresData);

        this.generatePieChart(labels, valores, 'Profesores con mayores incidentes');
      },
      (error) => {
        console.error('Error al obtener los datos de profesores', error);
      }
    );
  }

  aggregateData(data: any[], field: string): { [key: string]: number } {
    const aggregatedData: { [key: string]: number } = {};
    data.forEach((item) => {
      const label = item[field];
      if (aggregatedData[label]) {
        aggregatedData[label]++;
      } else {
        aggregatedData[label] = 1;
      }
    });
    return aggregatedData;
  }

  generatePieChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Ajustar el tamaño del canvas
        canvas.width = 600;
        canvas.height = 500;

        // Generar colores aleatorios para el fondo y el borde
        const backgroundColors = this.generarColoresAleatorios(labels.length);
        const borderColor = backgroundColors.map((color) =>
          color.replace('0.2', '1')
        );

        // Formatear las etiquetas con la cantidad correspondiente
        const formattedLabels = labels.map(
          (label, index) => `${label} (${valores[index]})`
        );

        // Crear instancia de Chart.js
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: formattedLabels,
            datasets: [
              {
                data: valores,
                backgroundColor: backgroundColors,
                borderColor: borderColor,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 24,
                },
                color: 'black',
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
              legend: {
                display: true,
                position: 'top',
                align: 'center',
                labels: {
                  color: 'black',
                  boxWidth: 12,
                  padding: 10,
                },
              },
            },
          },
        });

        // Ajustar la posición vertical de la leyenda
        const legend = canvas.nextSibling as HTMLElement;
        if (legend) {
          legend.style.marginTop = '10px';
        }
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "pie-chart".');
    }
  }

  generarColoresAleatorios(cantidad: number): string[] {
    const colores: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colores.push(color);
    }
    return colores;
  }

  cargarTablaProfesores() {
    this.profincidentesService.getProfesores().subscribe(
      (data: any[]) => {
        const tableBody = document.querySelector('#profesor-table tbody');
        if (tableBody) {
          tableBody.innerHTML = '';
          data.forEach((item, index) => {
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            cellId.textContent = (index + 1).toString();
            const cellProfesor = document.createElement('td');
            cellProfesor.textContent = item.Profesor;
            row.appendChild(cellId);
            row.appendChild(cellProfesor);
            tableBody.appendChild(row);
          });
        } else {
          console.error('No se encontró el elemento tbody de la tabla.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de profesores para la tabla', error);
      }
    );
  }

  filtrarPorProfesor(event: any) {
    const value = event.target.value;
    const tableBody = document.querySelector('#profesor-table tbody');
    if (tableBody) {
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach((row) => {
        const profesor = row.querySelector('td:nth-child(2)')?.textContent || '';
        if (profesor.toLowerCase().includes(value.toLowerCase())) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    } else {
      console.error('No se encontró el elemento tbody de la tabla.');
    }
  }
  
  
  goToPanelControl() {
    this.navCtrl.navigateForward('/panel-control');
  }
  goToEstadisticas() {
    this.navCtrl.navigateForward('/estadisticas');
  }
  goToListaClips() {
    this.navCtrl.navigateForward('/lista-clips');
  }
}
