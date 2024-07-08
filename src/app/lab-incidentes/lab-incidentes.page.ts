import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { LabIncidentesService } from './lab-incidentes.service';

@Component({
  selector: 'app-lab-incidentes',
  templateUrl: './lab-incidentes.page.html',
  styleUrls: ['./lab-incidentes.page.scss'],
})
export class LabIncidentesPage implements OnInit {
  laboratoriosData: { [laboratorio: string]: number } = {};

  constructor(
    private navCtrl: NavController,
    private labIncidenteService: LabIncidentesService
  ) {
    // Registrar los módulos necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.generarGraficoLaboratorios();
    this.cargarTablaLaboratorios();
  }

  generarGraficoLaboratorios() {
    this.labIncidenteService.getLaboratorios().subscribe(
      (data: any[]) => {
        this.laboratoriosData = this.aggregateData(data, 'NumLab');
        const labels = Object.keys(this.laboratoriosData);
        const valores = Object.values(this.laboratoriosData);

        this.generateHorizontalBarChart(labels, valores, 'Laboratorios con incidentes');
      },
      (error) => {
        console.error('Error al obtener los datos de laboratorios', error);
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

  generateHorizontalBarChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('fourth-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Configuración del gráfico
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: title,
              data: valores,
              backgroundColor: this.generarColoresAleatorios(labels.length),
              borderColor: this.generarColoresAleatorios(labels.length).map(color => color.replace('0.2', '1')),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 24
                },
                color: 'black', // Cambiar el color del título a negro
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false, // Ocultar la leyenda de Chart.js
              }
            },
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                ticks: {
                  callback: function(value) {
                    return value.toString().substring(0, 5);
                  }
                }
              }
            },
            animation: {
              onComplete: function(animation) {
                // No hacer nada en la animación completa para evitar dibujar texto sobre las barras
              }
            }
          }
        });
  
        // Añadir título encima del gráfico (opcional)
        const chartContainer = canvas.parentElement;
        if (chartContainer) {
          const titleElement = document.createElement('h2');
          titleElement.textContent = title;
          titleElement.style.color = 'black'; // Cambiar el color del título a negro
          titleElement.style.textAlign = 'center';
          titleElement.style.fontWeight = 'bold';
          titleElement.style.position = 'absolute';
          titleElement.style.top = '10px';
          titleElement.style.left = '50%';
          titleElement.style.transform = 'translateX(-50%)';
          titleElement.style.marginBottom = '10px';
          chartContainer.appendChild(titleElement);
        } else {
          console.error('No se encontró el contenedor del gráfico.');
        }
  
        // Añadir leyenda personalizada (opcional)
        const legendContainer = document.createElement('div');
        legendContainer.style.display = 'flex';
        legendContainer.style.flexWrap = 'wrap';
        legendContainer.style.justifyContent = 'center';
        legendContainer.style.position = 'absolute';
        legendContainer.style.top = '50px';
        legendContainer.style.left = '0';
        legendContainer.style.right = '0';
        legendContainer.style.marginBottom = '40px';
        legendContainer.style.padding = '20px';
  
        labels.forEach((label, index) => {
          const color = this.generarColoresAleatorios(labels.length)[index];
  
          const legendItem = document.createElement('div');
          legendItem.style.display = 'flex';
          legendItem.style.alignItems = 'center';
          legendItem.style.marginBottom = '10px';
  
          const icon = document.createElement('div');
          icon.style.width = '12px';
          icon.style.height = '12px';
          icon.style.backgroundColor = color || 'transparent';
          icon.style.marginRight = '5px';
          legendItem.appendChild(icon);
  
          const text = document.createElement('span');
          text.textContent = `${label} (${valores[index]})`;
          legendItem.appendChild(text);
  
          legendContainer.appendChild(legendItem);
        });
  
        if (chartContainer) {
          legendContainer.style.color = 'black'; // Cambiar el color del texto de la leyenda a negro
          chartContainer.appendChild(legendContainer);
        } else {
          console.error('No se encontró el contenedor del gráfico para la leyenda.');
        }
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "fourth-chart".');
    }
  }

  generarColoresAleatorios(cantidad: number): string[] {
    const colores: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colores.push(color);
    }
    return colores;
  }

  cargarTablaLaboratorios() {
    this.labIncidenteService.getLaboratorios().subscribe(
      (data: any[]) => {
        const tableBody = document.querySelector('#laboratorio-table tbody');
        if (tableBody) {
          tableBody.innerHTML = '';
          data.forEach((item, index) => {
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            cellId.textContent = (index + 1).toString();
            const cellLaboratorio = document.createElement('td');
            cellLaboratorio.textContent = item.NumLab;
            row.appendChild(cellId);
            row.appendChild(cellLaboratorio);
            tableBody.appendChild(row);
          });
        } else {
          console.error('No se encontró el elemento tbody de la tabla.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de laboratorios para la tabla', error);
      }
    );
  }

  filtrarPorLaboratorio(event: any) {
    const value = event.target.value;
    const tableBody = document.querySelector('#laboratorio-table tbody');
    if (tableBody) {
      const rows = tableBody.querySelectorAll('tr');
      rows.forEach((row) => {
        const laboratorio = row.querySelector('td:nth-child(2)')?.textContent || '';
        if (laboratorio.toLowerCase().includes(value.toLowerCase())) {
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
