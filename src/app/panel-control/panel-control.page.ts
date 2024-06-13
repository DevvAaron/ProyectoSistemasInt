import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoboflowApiService } from '../roboflow-api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.page.html',
  styleUrls: ['./panel-control.page.scss'],
})
export class PanelControlPage implements OnInit {
  @ViewChild('cameraFeed', { static: false }) cameraFeed!: ElementRef<HTMLVideoElement>;

  constructor(private roboflowApiService: RoboflowApiService, private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeCamera();
    });
  }

  registrar() {
    // Lógica para el método registrar
    console.log('Registrar button clicked');
  }

  seleccionarLab(lab: string) {
    // Lógica para el método seleccionarLab
    console.log('Selected lab:', lab);
  }

  initializeCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.cameraFeed.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Error accessing webcam: ', err);
      });
  }

  captureAndInfer() {
    const video = this.cameraFeed.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg').split(',')[1];

      const datasetSlug = 'proyectoccompputadoras'; // Reemplaza con tu dataset slug
      const versionNumber = '2'; // Reemplaza con tu versión número
      const apiKey = 'kEet1F6PPxKxSeO8LyDQ'; // Reemplaza con tu API key

      this.roboflowApiService.inferFromDataset(datasetSlug, versionNumber, apiKey, imageData).subscribe(response => {
        console.log('Inference response: ', response);
      });
    } else {
      console.error('Error: 2D context not available.');
    }
  }
}
