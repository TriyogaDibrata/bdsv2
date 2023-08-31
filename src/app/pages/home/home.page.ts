import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public isMenuOpen: boolean = false;
  public scrollTop: number = 0;

  public menus = [
    {
      name: 'Verifikasi Dokumen',
      icon: 'scan-outline',
      action: '',
    },
    {
      name: 'Dokumen Belum TTE',
      icon: 'document-text-outline',
      action: '',
    },
    {
      name: 'Riwayat TTE',
      icon: 'documents-outline',
      action: '',
    },
    {
      name: 'Lainnya',
      icon: 'grid-outline',
      action: '',
    },
  ];

  constructor(public menuCtrl: MenuController) {}

  async ngOnInit() {}

  public async toggleSideMenu() {
    this.menuCtrl.toggle('main-menu');
  }

  public async handleScrollEvents(ev: any) {
    this.scrollTop = ev.detail.scrollTop;
  }
}
