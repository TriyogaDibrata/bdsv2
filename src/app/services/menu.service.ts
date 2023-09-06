import { Injectable } from '@angular/core';
import { SheetMenuComponent } from '@components/sheet-menu/sheet-menu.component';
import { ModalController, NavController } from '@ionic/angular';

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
      action: () => this.navCtrl.navigateForward('new-doc'),
    },
    {
      name: 'Riwayat TTE',
      icon: 'documents-outline',
      action: () => this.navCtrl.navigateForward('signed-doc'),
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
      action: () => {
        this.closeModal().then(() => this.navigateTo('new-doc'));
      },
    },
    {
      name: 'Riwayat TTE',
      icon: 'documents-outline',
      action: () => {
        this.closeModal().then(() => this.navigateTo('signed-doc'));
      },
    },
    {
      name: 'Surat Masuk',
      icon: 'file-tray-outline',
      action: () => {
        this.closeModal().then(() => this.navigateTo('inbox'));
      },
    },
    {
      name: 'Surat Keluar',
      icon: 'send-outline',
      action: () => {
        this.closeModal().then(() => this.navigateTo('sent'));
      },
    },
    {
      name: 'Agenda',
      icon: 'calendar-outline',
      action: () => {
        this.closeModal().then(() => this.navigateTo('agenda'));
      },
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) {}

  public async openSheetMenu() {
    const modal = await this.modalCtrl.create({
      component: SheetMenuComponent,
      cssClass: 'modal-sheet-auto-height',
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });

    modal.present();
  }

  public async closeModal() {
    return await this.modalCtrl.dismiss();
  }

  public async navigateTo(page: string = '') {
    this.navCtrl.navigateForward(page);
  }
}
