import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;

  async doLogin() {
    if (this.email == ''
      || this.email.includes('@') == false) {
      this.invalidEmail = true;
      return;
    } else if (this.password == '') {
      this.invalidEmail = false;
      this.invalidPassword = true;
      return;
    }
    await this.showLoading();
    this.route.navigate(['/home'])
  }
  constructor(
    private route: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',

    });

    loading.present();
    // Simula o tempo de processamento de 3s
    await new Promise(resolve => setTimeout(resolve, 3000));

    await loading.dismiss();
  }

}
