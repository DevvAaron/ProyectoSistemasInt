import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss'],
})
export class LoginAdministradorPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  async regresarHome(){
  
  this.navCtrl.navigateBack('/home');
}
}
