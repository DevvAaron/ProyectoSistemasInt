import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { EstadisticasService } from './estadisticas.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  profesoresData: { [profesor: string]: number } = {};
  cursosData: { [curso: string]: number } = {};
  turnosData: { [turno: string]: number } = {};
  laboratoriosData: { [laboratorio: string]: number } = {};

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private estadisticasService: EstadisticasService
  ) {
    // Registrar los módulos necesarios de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.generarGraficoProfesores();
    this.generarGraficoCursos();
    this.generarGraficoTurnos();
    this.generarGraficoLaboratorios();
  }

  generarGraficoProfesores() {
    this.estadisticasService.getProfesores().subscribe(
      (data: any[]) => {
        this.profesoresData = this.aggregateData(data, 'Profesor');
        this.generatePieChart(Object.keys(this.profesoresData), Object.values(this.profesoresData), 'Profesores con mayores incidentes');
      },
      (error) => {
        console.error('Error al obtener los datos de profesores', error);
      }
    );
  }

  generarGraficoCursos() {
    this.estadisticasService.getCursos().subscribe(
      (data: any[]) => {
        this.cursosData = this.aggregateData(data, 'Curso');
        this.generateBarChart(Object.keys(this.cursosData), Object.values(this.cursosData), 'Cursos con mayores incidentes');
      },
      (error) => {
        console.error('Error al obtener los datos de cursos', error);
      }
    );
  }

  generarGraficoTurnos() {
    this.estadisticasService.getIncidentesPorTurnos().subscribe(
      (data: any[]) => {
        this.turnosData = this.aggregateData(data, 'Turno');
        this.generateLineChart(Object.keys(this.turnosData), Object.values(this.turnosData), 'Incidentes por Turnos');
      },
      (error) => {
        console.error('Error al obtener los datos de incidentes por turnos', error);
      }
    );
  }

  generarGraficoLaboratorios() {
    this.estadisticasService.getLaboratorios().subscribe(
      (data: any[]) => {
        this.laboratoriosData = this.aggregateData(data, 'NumLab');
        this.generateHorizontalBarChart(Object.keys(this.laboratoriosData), Object.values(this.laboratoriosData), 'Laboratorios con incidentes');
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

  generatePieChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('pie-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
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
                color: 'white',
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false  // Aquí desactivamos la leyenda
              }
            }
          }
        });
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "pie-chart".');
    }
  }
  
  generateBarChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
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
                color: 'white',
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false  // Desactivar la leyenda
              }
            }
          }
        });
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "bar-chart".');
    }
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
                color: 'white',
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false  // Desactivar la leyenda
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
  
  generateHorizontalBarChart(labels: string[], valores: number[], title: string) {
    const canvas = document.getElementById('fourth-chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
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
            indexAxis: 'y',
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 24
                },
                color: 'white',
                padding: {
                  top: 10,
                  bottom: 30
                }
              },
              legend: {
                display: false  // Desactivar la leyenda
              }
            }
          }
        });
      } else {
        console.error('No se pudo obtener el contexto 2D del elemento canvas.');
      }
    } else {
      console.error('No se encontró el elemento canvas con ID "fourth-chart".');
    }
  }
  

  generarColoresAleatorios(length: number): string[] {
    const colores: string[] = [];
    for (let i = 0; i < length; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colores.push(color);
    }
    return colores;
  }

  imprimirPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const charts = ['pie-chart', 'bar-chart', 'line-chart', 'fourth-chart'];
    let promises = charts.map((chartId, index) => {
      const canvas = document.getElementById(chartId) as HTMLCanvasElement;
      return html2canvas(canvas).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        if (index !== 0) {
          doc.addPage();
        }
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      });
    });

    Promise.all(promises).then(() => {
      doc.save('graficas.pdf');
    });
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

