import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
  public showPassword: boolean = false;
  public error: any = '';

  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  public login() {
    console.log(this.loginForm.value);
    this.navCtrl.navigateRoot('home');
  }
}
