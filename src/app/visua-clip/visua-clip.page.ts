import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-visua-clip',
  templateUrl: './visua-clip.page.html',
  styleUrls: ['./visua-clip.page.scss'],
})
export class VisuaClipPage implements OnInit {

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

  // goToLoginProfesional(){
  //   this.navCtrl.navigateForward('/login-profesional');
  // }

}
