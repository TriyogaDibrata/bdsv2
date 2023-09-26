import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss'],
})
export class ModalLogoutComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  confirmLogout() {
    this.modalCtrl.dismiss('confirm', 'confirm');
  }
}
