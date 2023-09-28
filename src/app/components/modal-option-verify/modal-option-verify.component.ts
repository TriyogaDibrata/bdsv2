import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-option-verify',
  templateUrl: './modal-option-verify.component.html',
  styleUrls: ['./modal-option-verify.component.scss'],
})
export class ModalOptionVerifyComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal(data) {
    this.modalCtrl.dismiss(data, 'chosen');
  }
}
