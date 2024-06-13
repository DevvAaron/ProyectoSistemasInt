import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

  formHome: FormGroup;
  
  constructor(
    private navCtrl: NavController,
    public fb: FormBuilder
  ) {
    this.formHome = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  goToSeleccion(){
  this.navCtrl.navigateForward('/seleccion');
 }
 goToLoginAdministrador(){
  this.navCtrl.navigateForward('/login-administrador');
 }

}


