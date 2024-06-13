import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {

  constructor(private navCtrl: NavController, private menuCtrl: MenuController) { }

  ngOnInit() {
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
