import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-action-disposisi',
  templateUrl: './modal-action-disposisi.component.html',
  styleUrls: ['./modal-action-disposisi.component.scss'],
})
export class ModalActionDisposisiComponent implements OnInit {
  @Input() candisposisi: boolean;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal(data) {
    this.modalCtrl.dismiss(data);
  }
}
