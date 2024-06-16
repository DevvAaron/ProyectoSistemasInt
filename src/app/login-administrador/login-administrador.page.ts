import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginAdministradorService } from './login-administrador.service';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss'],
})
export class LoginAdministradorPage implements OnInit {
  usuarios: any[] = [];
  labs: any[] = [];
  clips: any[] = [];

  id: string = '';
  usuario: string = '';
  clave: string = '';
  correo: string = '';

  constructor(private navCtrl: NavController,
    private loginAdministradorService: LoginAdministradorService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loginAdministradorService.getUsuarios().subscribe(data => {
      console.log('Usuarios:', data);
      this.usuarios = data;
    });
  }

  registrarUsuario() {
    const newUsuario = {
      Usuario: this.usuario,
      Clave: this.clave,
      Correo: this.correo
    };
  
    this.loginAdministradorService.registrarUsuario(newUsuario).subscribe(res => {
      console.log('Respuesta del backend:', res);
      // Actualizar la lista después de registrar
      this.cargarUsuarios();
    });
  }
  
  async regresarHome(){
  
  this.navCtrl.navigateBack('/home');
}
}
