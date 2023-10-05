import { Injectable } from '@angular/core';
import { ModalOptionVerifyComponent } from '@components/modal-option-verify/modal-option-verify.component';
import { ModalVerifyResultComponent } from '@components/modal-verify-result/modal-verify-result.component';
import { ModalVerifyUploadComponent } from '@components/modal-verify-upload/modal-verify-upload.component';
import { SheetMenuComponent } from '@components/sheet-menu/sheet-menu.component';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { IframerComponent } from '@components/iframer/iframer.component';
import { TextsizerComponent } from '@components/textsizer/textsizer.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public user = this.auth.userData;
  public homeMenus = [
    {
      name: 'Verifikasi Dokumen',
      icon: 'checkbox-outline',
      action: () => this.showModalOption(),
    },
    {
      name: 'Belum TTE',
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
      action: () => {
        this.closeModal().then(() => this.showModalOption());
      },
    },
    {
      name: 'Belum TTE',
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

  public sideMenus = {
    'Kelola Akun': [
      {
        name: 'Sunting Profil',
        icon: 'person-circle-outline',
        action: () => {
          this.menuCtrl.close().then(() => this.navigateTo('update-profile'));
        },
        isShow: true,
      },
      {
        name: 'Ubah Kata Sandi',
        icon: 'lock-closed-outline',
        action: () => {
          this.menuCtrl.close().then(() => this.navigateTo('update-password'));
        },
      },
      {
        name: 'Ubah Passphrase',
        icon: 'key-outline',
        action: () => {
          this.menuCtrl
            .close()
            .then(() => this.navigateTo('update-passphrase'));
        },
      },
    ],
    Lainnya: [
      {
        name: 'Panduan Verifikasi Dokumen',
        icon: 'document-lock-outline',
        action: () => {
          this.menuCtrl
            .close()
            .then(() =>
              this.openIframer('https://tte.badungkab.go.id/validation'),
            );
        },
      },
      {
        name: 'Pengaturan',
        icon: 'settings-outline',
        action: () => {
          this.menuCtrl.close().then(() => this.navigateTo('settings'));
        },
      },
    ],
  };

  settingsMenu = [
    {
      name: 'Biometrics',
      icon: 'person-circle-outline',
      action: () => {
        console.log('clicked!');
      },
    },
    {
      name: 'Ukuran Font',
      icon: 'text-outline',
      action: async () => {
        this.openTextZoomModal();
      },
    },
    {
      name: 'Tentang Aplikasi',
      icon: 'information-circle-outline',
      action: () => {
        this.navCtrl.navigateForward('about-app');
      },
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private auth: AuthService,
    private menuCtrl: MenuController,
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

  async showModalOption() {
    const modal = await this.modalCtrl.create({
      component: ModalOptionVerifyComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    const onDismiss = await modal.onDidDismiss();

    if (onDismiss.role == 'chosen') {
      if (onDismiss.data == 'scan') {
        this.navCtrl.navigateForward('barcode-scanner');
      } else if (onDismiss.data == 'upload') {
        this.showModalVerifyUpload();
      }
    }
  }

  async showModalVerifyUpload() {
    const modal = await this.modalCtrl.create({
      component: ModalVerifyUploadComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }

  async openIframer(url) {
    const modal = await this.modalCtrl.create({
      component: IframerComponent,
      componentProps: {
        url: url,
        title: 'Panduan Verifikasi',
      },
    });

    await modal.present();
  }

  async openTextZoomModal() {
    const modal = await this.modalCtrl.create({
      component: TextsizerComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();
  }
}
