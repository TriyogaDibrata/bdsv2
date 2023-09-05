import { Injectable } from '@angular/core';
import { SheetMenuComponent } from '@components/sheet-menu/sheet-menu.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public homeMenus = [
    {
      name: 'Verifikasi Dokumen',
      icon: 'checkbox-outline',
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
      action: () => this.openSheetMenu(),
    },
  ];

  public menus = [
    {
      name: 'Verifikasi Dokumen',
      icon: 'checkbox-outline',
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
      name: 'Surat Masuk',
      icon: 'file-tray-outline',
      action: '',
    },
    {
      name: 'Surat Keluar',
      icon: 'send-outline',
      action: '',
    },
    {
      name: 'Agenda',
      icon: 'calendar-outline',
      action: '',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  public async openSheetMenu() {
    const modal = await this.modalCtrl.create({
      component: SheetMenuComponent,
      cssClass: 'modal-sheet-auto-height',
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });

    modal.present();
  }
}
