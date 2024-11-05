import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { Notifications } from '@interfaces/notifications';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { UserNotificationService } from '@services/user-notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public scrollTop: number = 0;
  public notifs: Notifications[];
  public infiniteScrollData: any = {
    enable: false,
    page: 1,
  };

  constructor(
    private userNotif: UserNotificationService,
    public loader: LoadingService,
    private alertService: AlertService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    moment.locale('ID');
    this.initialData();
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  initialData() {
    this.userNotif.getUserNotif().subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.notifs = res.data.notif.data;

          if (res.data.notif.next_page_url) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          }
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText || err?.status_text,
          text: err?.message || err?.msg,
        });
      },
    });
  }

  public async loadMore(ev) {
    return (
      await this.userNotif.getUserNotif(this.infiniteScrollData.page)
    ).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          res.data.notif.data.forEach((el) => {
            this.notifs.push(el);
          });
          if (res.data.notif.next_page_url) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          } else {
            this.infiniteScrollData.enable = false;
          }
        }
      },
      error: (err) => {
        this.alertService.showAlert({
          status: 'error',
          autoClose: false,
          showConfirmButton: true,
          title: err?.statusText || err?.status_text,
          text: err?.message || err?.msg,
        });
      },
      complete: () => {
        ev.target.complete();
      },
    });
  }

  convertDate(date) {
    if (!date) {
      return '';
    }

    return moment(date).format('lll');
  }
}
