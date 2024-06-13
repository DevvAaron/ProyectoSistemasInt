import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.page.html',
  styleUrls: ['./panel-control.page.scss'],
})
export class PanelControlPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    // Obtener el elemento video
    const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;

    // Pedir permiso para acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Asignar el flujo de la cámara al elemento video
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara:', error);
      });
  }

  registrar() {
    // Lógica para registrar
    console.log('Registrando...');
  }

  seleccionarLab(lab: string) {
    // Lógica para seleccionar el laboratorio
    console.log('Laboratorio seleccionado:', lab);
  }

  goToLoginProfesional() {
    // Lógica para navegar a la página de login de profesionales
    this.navCtrl.navigateForward('/login-profesional');
  }
}
