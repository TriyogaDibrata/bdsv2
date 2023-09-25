import { Component, Input, OnInit } from '@angular/core';
import { DocDetail } from '@interfaces/doc-detail';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sheet-action',
  templateUrl: './sheet-action.component.html',
  styleUrls: ['./sheet-action.component.scss'],
})
export class SheetActionComponent implements OnInit {
  @Input() doc: DocDetail;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onDismiss(data, role) {
    this.modalCtrl.dismiss(data, role);
  }
}
