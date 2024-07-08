import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion-estadisticas',
  templateUrl: './seleccion-estadisticas.page.html',
  styleUrls: ['./seleccion-estadisticas.page.scss'],
})
export class SeleccionEstadisticasPage implements OnInit {

  constructor(private navCtrl: NavController, private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  // goToPanelControl() {
  //   this.navCtrl.navigateForward('/panel-control');
  // }
  
  // goToEstadisticas() {
  //   this.navCtrl.navigateForward('/estadisticas');
  // }
  
  // goToListaClips() {
  //   this.navCtrl.navigateForward('/lista-clips');
  // }


  goToProfIncidentes() {
    this.navCtrl.navigateForward('/prof-incidentes');
  }

  goToLabIncidentes() {
    this.navCtrl.navigateForward('/lab-incidentes');
  }

  goToCursoIncidentes() {
    this.navCtrl.navigateForward('/curso-incidentes');
  }

  goToTurnIncidentes() {
    this.navCtrl.navigateForward('/turn-incidentes');
  }

  openMenu() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.open('start'); 
  }
}
