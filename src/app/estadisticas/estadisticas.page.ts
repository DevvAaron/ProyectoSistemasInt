import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
  @ViewChild('investmentsChart') investmentsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('investments1Chart') investments1ChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('investments2Chart') investments2ChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('investments3Chart') investments3ChartRef!: ElementRef<HTMLCanvasElement>;

  Profesorrepetidos: any[] = [];
  Cursosincidentes: any[] = [];
  LabsconIncidentes: any[] = [];
  TurnosConIncidentes: any[] = [];

  constructor(private navCtrl: NavController, 
    private menuCtrl: MenuController, 
    private estadisticasService: EstadisticasService) {}

    public async generatePDF() {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height;
      const imageHeight = 90;
      const spacing = 10;
  
      const addChartToPDF = async (canvasElement: ElementRef<HTMLCanvasElement>, yOffset: number, text: string) => {
        const canvas = canvasElement.nativeElement;
        const canvasImg = await html2canvas(canvas);
        const imgData = canvasImg.toDataURL('image/png');
        if (yOffset + imageHeight + spacing > pageHeight) {
          pdf.addPage();
          yOffset = 10;
        }
        pdf.text(text, 10, yOffset);
        pdf.addImage(imgData, 'PNG', 10, yOffset + spacing, 180, imageHeight);
        return yOffset + imageHeight + spacing * 2;
      };
  
      let yOffset = 10;
  
      yOffset = await addChartToPDF(this.investmentsChartRef, yOffset, "Profesores con Incidentes");
      yOffset = await addChartToPDF(this.investments1ChartRef, yOffset, "Cursos con Incidentes");
      yOffset = await addChartToPDF(this.investments2ChartRef, yOffset, "Laboratorio con Incidentes");
      yOffset = await addChartToPDF(this.investments3ChartRef, yOffset, "Turnos con Incidentes");
  
      pdf.save('estadisticas.pdf');
    }
  
    printCanvas(canvas: HTMLCanvasElement): void {
      let windowContent = '<!DOCTYPE html>';
      windowContent += '<html>';
      windowContent += '<head><title>Print Canvas</title></head>';
      windowContent += '<body>';
      windowContent += '<img src="' + canvas.toDataURL() + '" style="width:100%; height:auto;">'; // Mostrar el canvas como imagen
      windowContent += '</body>';
      windowContent += '</html>';
    
      const printWin = window.open('', '', 'width=1300px,height=900px');
      if (!printWin) {
        console.error('No se pudo abrir la ventana de impresión.');
        return;
      }
    
      printWin.document.open();
      printWin.document.write(windowContent);
      printWin.document.close();
      printWin.focus();
      printWin.print();
      printWin.close();
    }
  
    ngOnInit() {
      Chart.register(...registerables);
      this.cargarProfesorRepetidos();
      this.generateChart();
      this.generateChart1();
      this.generateCharts2();
      this.generateCharts3()
    }
  

    cargarProfesorRepetidos() {
      this.estadisticasService.getProfesorRepetidos().subscribe(data => {
        console.log('ProfesorRepetidos:', data);
        this.Profesorrepetidos = data;
      });
    }
  
    generateChart() {
      this.estadisticasService.getProfesorRepetidos().subscribe(data => {
        const labels = data.map(item => item.Profesor); // Ajusta según la estructura de tu tabla
        const valores = data.map(item => item.VecesRepetido);  // Ajusta según la estructura de tu tabla
        this.generateCharts(labels, valores);
      });
    }
  
    generateCharts(labels: string[], valores: number[]) {
      const canvas = document.getElementById('investments-chart') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: valores,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.raw !== null) {
                        label += context.raw;
                      }
                      return label;
                    }
                  }
                }
              }
            }
          });
        } else {
          console.error('Could not get 2D context from canvas element.');
        }
      } else {
        console.error('Could not find canvas element with id "investments-chart".');
      }
    }
  
    generateChart1() {
      this.estadisticasService.getCursosIncidentes().subscribe(data => {
        const labels1 = data.map(item => item.Curso); // Ajusta según la estructura de tu tabla
        const valores1 = data.map(item => item.VecesRepetido);  // Ajusta según la estructura de tu tabla
        
        const canvas1 = document.getElementById('investments1-chart') as HTMLCanvasElement;
        if (canvas1) {
          const ctx1 = canvas1.getContext('2d');
          if (ctx1) {
            // Destruir la instancia previa de Chart si existe
            if (Chart.getChart(ctx1)) {
              Chart.getChart(ctx1)?.destroy();
            }
            
            new Chart(ctx1, {
              type: 'bar',
              data: {
                labels: labels1,
                datasets: [{
                  label: 'Porcentaje de personas involucradas',
                  data: valores1,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          } else {
            console.error('Could not get 2D context from canvas element.');
          }
        } else {
          console.error('Could not find canvas element with ID "investments-chart".');
        }
      });
    }
    
    generateCharts2() {
      this.estadisticasService.getLabsConIncidentes().subscribe(data => {
        const labels2 = data.map(item => item.NumLab); // Ajusta según la estructura de tu tabla
        const valores2 = data.map(item => item.VecesRepetido); // Ajusta según la estructura de tu tabla
    
        const canvas2 = document.getElementById('investments2-chart') as HTMLCanvasElement;
        if (canvas2) {
          const ctx2 = canvas2.getContext('2d');
          if (ctx2) {
            // Destruir la instancia previa de Chart si existe
            if (Chart.getChart(ctx2)) {
              Chart.getChart(ctx2)?.destroy();
            }
    
            new Chart(ctx2, {
              type: 'bar', // Utiliza 'bar' como tipo de gráfico
              data: {
                labels: labels2,
                datasets: [{
                  label: 'Porcentaje de personas involucradas',
                  data: valores2,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                indexAxis: 'y', // Establece el eje de índice en 'y' para orientación horizontal
                scales: {
                  x: {
                    beginAtZero: true
                  }
                }
              }
            });
          } else {
            console.error('Could not get 2D context from canvas element.');
          }
        } else {
          console.error('Could not find canvas element with ID "investments2-chart".');
        }
      });
    }
    generateCharts3() {
      const canvas3 = document.getElementById('investments3-chart') as HTMLCanvasElement;
      if (canvas3) {
        const ctx3 = canvas3.getContext('2d');
        if (ctx3) {
          // Destruir la instancia previa de Chart si existe
          if (Chart.getChart(ctx3)) {
            Chart.getChart(ctx3)?.destroy();
          }
    
          this.estadisticasService.getTurnosConIncidentes().subscribe({
            next: data => {
              const labels3 = data.map(item => item.Turno); // Ajusta según la estructura de tu tabla
              const valores3 = data.map(item => item.NumeroDeIncidentes); // Ajusta según la estructura de tu tabla
    
              new Chart(ctx3, {
                type: 'line',
                data: {
                  labels: labels3,
                  datasets: [{
                    label: 'Número de Incidentes por Turno',
                    data: valores3,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
                },
                options: {
                  scales: {
                    x: {
                      beginAtZero: true
                    },
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });
            },
            error: error => {
              console.error('Error fetching TurnosConIncidentes data:', error);
              // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            }
          });
        } else {
          console.error('Could not get 2D context from canvas element.');
        }
      } else {
        console.error('Could not find canvas element with ID "investments3-chart".');
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

  openMenu() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.open('start');
  }
}
