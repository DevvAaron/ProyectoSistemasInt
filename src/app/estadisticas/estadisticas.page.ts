import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {


  constructor(private navCtrl: NavController,
    private ref: ChangeDetectorRef) { 

  }

  ngOnInit() {
    this.ref.detectChanges();
    this.generateCharts();
    this.generateCharts1(); 
    this.generateCharts2(); 
  }

  generateCharts() {
    const canvas = document.getElementById('investments-chart') as HTMLCanvasElement;
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Billeteras ', 'Teléfonos', 'Gafas', 'Mochilas', 'Herramientas', 'Documentos'],
            datasets: [{
              data: [12, 19, 3, 5, 2, 3],
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
  generateCharts1() {
    const ctx1 = document.getElementById('investments1-chart') as HTMLCanvasElement ;
  
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['Hurtos', 'Perdidas de objetos', 'Violencia física', 'Daño a la propiedad'],
          datasets: [{
            label: 'porcentaje de personas involucradas',
            data: [12, 19, 3, 15],
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
      console.error('Could not find canvas element with ID "investments1-chart".');
    }
  }
  
  
  generateCharts2() {
    const ctx2 = document.getElementById('investments2-chart') as HTMLCanvasElement ;
  
        if (ctx2) {
          new Chart(ctx2, {

            type: 'bar', // Cambiar el tipo de gráfico a 'bar' para un gráfico de barras horizontales
            data: {
              labels: ['Hurtos', 'Perdidas de objetos', 'Violencia física', 'Daño a la propiedad'],
              datasets: [{
                label: 'porcentaje de personas involucradas',
                data: [12, 19, 3, 15],
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
              indexAxis: 'y', // Establecer el eje de índice en 'y' para un gráfico de barras horizontales
              scales: {
                x: { // Ajustar la escala x ya que ahora es horizontal
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          console.error('Could not find canvas element with ID "investments1-chart".');
        }
      }
}
