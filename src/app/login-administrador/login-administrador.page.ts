import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginAdministradorService } from './login-administrador.service';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.page.html',
  styleUrls: ['./login-administrador.page.scss'],
})
export class LoginAdministradorPage implements OnInit {
  formAdministrador: FormGroup;
  usuarios: any[] = []; // Declaración de la propiedad usuarios

  constructor(
    private navCtrl: NavController,
    public fb: FormBuilder,
    private loginAdministradorService: LoginAdministradorService
  ) {
    this.formAdministrador = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'clave': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loginAdministradorService.getUsuarios().subscribe(data => {
      console.log('Usuarios:', data);
      this.usuarios = data; // Asignación de datos a la propiedad usuarios
    });
  }

  registrarUsuario() {
    if (this.formAdministrador.valid) {
      const { usuario, clave, correo } = this.formAdministrador.value;
      const newUsuario = { Usuario: usuario, Clave: clave, Correo: correo };
  
      this.loginAdministradorService.registrarUsuario(newUsuario).subscribe(res => {
        console.log('Respuesta del backend:', res);
        this.cargarUsuarios(); // Actualización de la lista después de registrar
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  
  async regresarHome() {
    this.navCtrl.navigateBack('/home');
  }
}
