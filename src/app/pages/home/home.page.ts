import { Component, OnInit } from '@angular/core';
import { ModalLogoutComponent } from '@components/modal-logout/modal-logout.component';
import { ApiResponse } from '@interfaces/api-response';
import { User } from '@interfaces/user';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/loading.service';
import { MenuService } from '@services/menu.service';
import { PushNotifService } from '@services/push-notif.service';
import { RequestService } from '@services/request.service';
import { UserNotificationService } from '@services/user-notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public isMenuOpen: boolean = false;
  public scrollTop: number = 0;
  public user: User = this.auth.userData;
  public homeData: any;
  public serverDate: string;
  public serverTime: string;
  public notifs: [];

  constructor(
    public menuCtrl: MenuController,
    public auth: AuthService,
    private req: RequestService,
    public menu: MenuService,
    public navCtrl: NavController,
    private alertService: AlertService,
    public loader: LoadingService,
    private modalCtrl: ModalController,
    private pushNotif: PushNotifService,
    private userNotif: UserNotificationService,
  ) {}

  async ngOnInit() {
    moment.locale('ID');
    this.pushNotif.updateFcmToken();
    this.userNotif.getUserNotif().subscribe((res: ApiResponse) => {
      if (res && res.success) {
        this.notifs = res.data.notif.data;
      }
    });
  }

  ionViewWillEnter() {
    this.auth.user.subscribe((res) => {
      this.user = res;
    });
    this.getHomeStat();
  }

  public async toggleSideMenu() {
    this.menuCtrl.toggle('main-menu');
  }

  public async handleScrollEvents(ev: any) {
    this.scrollTop = ev.detail.scrollTop;
  }

  public getHomeStat() {
    this.req.apiGet('home/stat').subscribe({
      next: (res: ApiResponse) => {
        this.homeData = res.data;
        this.renderDateTime(res.data.time);
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          title: err?.statusText,
          text: err?.message,
          showConfirmButton: true,
        });
      },
      complete: () => {
        //do something when request complete
      },
    });
  }

  public renderDateTime(dateTime) {
    let newDate = moment(dateTime).unix();
    setInterval(() => {
      newDate = newDate + 1;
      this.serverDate = moment(newDate * 1000).format('dddd, DD MMMM YYYY');
      this.serverTime = moment(newDate * 1000).format('HH:mm:ss');
    }, 1000);
  }

  handleMenuClick(item) {
    if (item.action && typeof item.action == 'function') {
      item.action();
    }
    return;
  }

  handleRefresh(ev) {
    this.req.apiGet('home/stat').subscribe({
      next: (res: ApiResponse) => {
        this.homeData = res.data;
        this.renderDateTime(res.data.time);
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          title: err?.statusText,
          text: err?.message,
          showConfirmButton: true,
        });
      },
      complete: () => {
        ev.target.complete();
      },
    });
  }

  async logoutPrompt() {
    const modal = await this.modalCtrl.create({
      component: ModalLogoutComponent,
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    let onDidDismiss = await modal.onDidDismiss();

    if (onDidDismiss.role == 'confirm') {
      this.pushNotif.removeFcmToken().then(() => {
        this.auth.logout();
      });
    }
  }
}
