import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { EstadisticasService } from './estadisticas.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


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
        this.generateBarChart(Object.keys(this.cursosData), Object.values(this.cursosData), '');
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
            // Ajustar el tamaño del canvas
            canvas.width = 600; // Ancho en píxeles
            canvas.height = 500; // Alto en píxeles

            // Generar colores aleatorios para el fondo y el borde
            const backgroundColors = this.generarColoresAleatorios(labels.length);
            const borderColor = backgroundColors.map(color => color.replace('0.2', '1'));

            // Formatear las etiquetas con la cantidad correspondiente
            const formattedLabels = labels.map((label, index) => `${label} (${valores[index]})`);

            // Crear instancia de Chart.js
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: formattedLabels,
                    datasets: [{
                        data: valores,
                        backgroundColor: backgroundColors,
                        borderColor: borderColor,
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
                            color: 'black', // Color del texto del título
                            padding: {
                                top: 10,
                                bottom: 10 // Reducir el espacio inferior del título
                            }
                        },
                        legend: {
                            display: true,
                            position: 'top', // Posicionar la leyenda encima del gráfico
                            align: 'center', // Alinear la leyenda al centro
                            labels: {
                                color: 'black', // Color del texto de las etiquetas de la leyenda
                                boxWidth: 12,
                                padding: 10 // Reducir el espacio entre las etiquetas de la leyenda
                            }
                        }
                    }
                }
            });

            // Ajustar la posición vertical de la leyenda
            const legend = canvas.nextSibling as HTMLElement;
            if (legend) {
                legend.style.marginTop = '10px'; // Reducir aún más la separación entre el gráfico y la leyenda
            }
        } else {
            console.error('No se pudo obtener el contexto 2D del elemento canvas.');
        }
    } else {
        console.error('No se encontró el elemento canvas con ID "pie-chart".');
    }
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

  const chartContainer = canvas.parentElement;
  if (!chartContainer) {
    console.error('No se encontró el contenedor del gráfico.');
    return;
  }

  // Crear título encima del gráfico
  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Profesores con más incidentes';
  titleElement.style.color = 'black'; // Cambiar el color del título a negro
  titleElement.style.textAlign = 'center';
  titleElement.style.fontWeight = 'bold';
  titleElement.style.position = 'absolute';
  titleElement.style.top = '10px';
  titleElement.style.left = '50%';
  titleElement.style.transform = 'translateX(-50%)';
  titleElement.style.marginBottom = '10px';
  chartContainer.appendChild(titleElement);

  // Crear leyenda
  const legend = document.createElement('div');
  legend.style.display = 'flex';
  legend.style.flexWrap = 'wrap';
  legend.style.justifyContent = 'center';
  legend.style.position = 'absolute';
  legend.style.top = '50px';
  legend.style.left = '0';
  legend.style.right = '0';
  legend.style.marginBottom = '40px';
  legend.style.padding = '20px';

  labels.forEach((label, index) => {
    const color = backgroundColors[index];

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

    legend.appendChild(legendItem);
  });

  // Cambiar el color del texto de la leyenda a negro
  legend.style.color = 'black';

  // Añadir leyenda al contenedor
  chartContainer.appendChild(legend);

  const myChart = new Chart(ctx, {
    type: 'bar',
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
          ticks: {
            callback: function(value) {
              return value.toString().substring(0, 5);
            }
          }
        },
        y: {
          beginAtZero: true,
          position: 'bottom'
        }
      },
      layout: {
        padding: {
          top: 50
        }
      }
    }
  });
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
              color: 'black', // Cambiar el color del título a negro
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

  imprimir() {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const options = { scale: 2 };
  
    // Obtener los elementos canvas de los gráficos
    const pieCanvas = document.getElementById('pie-chart') as HTMLCanvasElement;
    const barCanvas = document.getElementById('bar-chart') as HTMLCanvasElement;
    const lineCanvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const horizontalBarCanvas = document.getElementById('fourth-chart') as HTMLCanvasElement;
  
    const addCanvasToPDF = (canvas: HTMLCanvasElement, pdf: jsPDF, addNewPage: boolean = true) => {
      html2canvas(canvas, options).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 180; // Ancho de la imagen en el PDF
        const imgHeight = 150; // Alto de la imagen en el PDF
        const margin = 10;
        const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2; // Coordenada X centrada
        const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2; // Coordenada Y centrada
  
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight); // Agregar imagen centrada al PDF
        pdf.rect(x - margin / 2, y - margin / 2, imgWidth + margin, imgHeight + margin); // Agregar marco
        if (addNewPage) {
          pdf.addPage(); // Nueva página para el siguiente gráfico
        } else {
          // Guardar o abrir el PDF generado
          pdf.save('graficos.pdf');
        }
      });
    };
  
    addCanvasToPDF(pieCanvas, pdf);
    addCanvasToPDF(barCanvas, pdf);
    addCanvasToPDF(lineCanvas, pdf);
    addCanvasToPDF(horizontalBarCanvas, pdf, false);
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
