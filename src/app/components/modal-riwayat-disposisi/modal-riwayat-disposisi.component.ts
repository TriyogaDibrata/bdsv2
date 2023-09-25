import { Component, Input, OnInit } from '@angular/core';
import { Disposisi } from '@interfaces/disposisi';

@Component({
  selector: 'app-modal-riwayat-disposisi',
  templateUrl: './modal-riwayat-disposisi.component.html',
  styleUrls: ['./modal-riwayat-disposisi.component.scss'],
})
export class ModalRiwayatDisposisiComponent implements OnInit {
  @Input() data: Disposisi[];

  constructor() {}

  ngOnInit() {}
}
