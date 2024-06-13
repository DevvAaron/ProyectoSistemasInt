import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-clips',
  templateUrl: './lista-clips.page.html',
  styleUrls: ['./lista-clips.page.scss'],
})
export class ListaClipsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goToVisuaClip(){
    this.navCtrl.navigateForward('/visua-clip');
  }

}
