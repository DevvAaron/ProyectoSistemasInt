import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NavController, MenuController } from '@ionic/angular';
import { ListaClipsService } from './lista-clips.service'; // Asegúrate de importar correctamente tu servicio
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-lista-clips',
  templateUrl: './lista-clips.page.html',
  styleUrls: ['./lista-clips.page.scss'],
})
export class ListaClipsPage implements OnInit {
  labs: any[] = [];
  filteredLabs: any[] = [];
  searchCriteria: string = 'profesor';
  searchTerm: string = '';
  message: string = '';

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private listaClipsService: ListaClipsService
  ) {}

  ngOnInit() {
    this.cargarLabs();
  }

  cargarLabs() {
    this.listaClipsService.getLabs().subscribe(
      (data: any) => {
        console.log('Labs:', data);
        this.labs = data;
        this.filteredLabs = [...this.labs]; // Inicializar filteredLabs con todos los labs al cargar
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching labs', error);
        this.message = 'Error al cargar los laboratorios. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }
  
  buscar() {
    if (!this.searchTerm) {
      this.filteredLabs = [...this.labs]; // Mostrar todos los labs si no hay término de búsqueda
      this.message = '';
      return;
    }
  
    const filters: any = {};
    filters[this.searchCriteria] = this.searchTerm;
  
    this.listaClipsService.search(filters).subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.filteredLabs = data;
          this.message = '';
        } else {
          this.filteredLabs = [];
          this.message = 'No se han encontrado esos datos';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching data', error);
        this.message = 'Error al realizar la búsqueda. Por favor, inténtelo de nuevo más tarde.';
      }
    );
  }


  generarPDF() {
    const data = document.getElementById('tabla-clips');
  
    if (data) {
      html2canvas(data).then(canvas => {
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // Tamaño A4 con orientación vertical
  
        const imgWidth = 190; // Ancho ajustado para dejar espacio para los márgenes
        const imgHeight = canvas.height * imgWidth / canvas.width;
  
        // Establecer los márgenes y calcular la posición de la tabla
        const marginLeft = 10; // Margen izquierdo
        const marginRight = pdf.internal.pageSize.width - marginLeft; // Margen derecho
        const marginTop = 35; // Margen superior aumentado para dejar espacio
        const tableHeight = imgHeight + 80; // Altura de la tabla con título y espacio adicional
        const marginBottom = pdf.internal.pageSize.height - tableHeight - marginTop; // Margen inferior
  
        // Agregar título
        pdf.setFontSize(16);
        pdf.text('Lista de Clips', (pdf.internal.pageSize.width / 2) - 40, 15, { align: 'center' }); // Título centrado
  
        // Obtener la fecha y hora actual
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const formattedTime = this.formatTime(currentDate.getHours()) + ':' + this.formatTime(currentDate.getMinutes()) + ':' + this.formatTime(currentDate.getSeconds());
        const dateTimeText = `Fecha de generación: ${formattedDate} - Hora: ${formattedTime}`;
  
        // Agregar texto adicional con la fecha y hora
        pdf.setFontSize(12);
        pdf.text(dateTimeText, (pdf.internal.pageSize.width / 2) - 45, 25, { align: 'center' }); // Texto adicional centrado
  
        const contentDataURL = canvas.toDataURL('image/png');
        pdf.addImage(contentDataURL, 'PNG', marginLeft, marginTop, imgWidth, imgHeight); // Posición ajustada de la tabla
  
        // Guardar el PDF
        pdf.save('lista-clips.pdf');
  
      }).catch(error => {
        console.error('Error al generar PDF:', error);
      });
    } else {
      console.error('No se encontró el elemento con el ID "tabla-clips".');
    }
  }
  
  formatTime(timeValue: number): string {
    return timeValue < 10 ? '0' + timeValue : '' + timeValue;
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
    this.menuCtrl.enable(true, 'start'); // Habilita la ventana deslizable
    this.menuCtrl.open('start'); // Abre la ventana deslizable
  }
  
}
