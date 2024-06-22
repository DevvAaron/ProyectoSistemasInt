import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  formHome: FormGroup;

  constructor(
    private navCtrl: NavController,
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formHome = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  login() {
    if (this.formHome.valid) {
      const { usuario, password } = this.formHome.value;
      console.log('Datos enviados para verificación:', { Usuario: usuario, Clave: password });

      this.http.post('http://localhost:3000/login', { Usuario: usuario, Clave: password })
        .subscribe(
          (response: any) => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', response);
            if (response.success) {
              console.log('Credenciales correctas. Redirigiendo...');
              this.navCtrl.navigateForward('/seleccion');
            } else {
              alert('Usuario o clave incorrectos. Por favor, inténtelo de nuevo.');
            }
          },
          (error) => {
            console.error('Error al verificar credenciales:', error);
            alert('Error al verificar credenciales. Por favor, inténtelo de nuevo.');
          }
        );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  goToLoginAdministrador() {
    this.navCtrl.navigateForward('/login-administrador');
  }
}
