import { Component, OnInit } from '@angular/core';
import { SheetMenuComponent } from '@components/sheet-menu/sheet-menu.component';
import { ApiResponse } from '@interfaces/api-response';
import { User } from '@interfaces/user';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';
import { MenuService } from '@services/menu.service';
import { RequestService } from '@services/request.service';
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

  constructor(
    public menuCtrl: MenuController,
    public auth: AuthService,
    private req: RequestService,
    public menu: MenuService,
    private modalCtrl: ModalController,
  ) {}

  async ngOnInit() {
    moment.locale('ID');
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
        console.log(err);
      },
      complete: () => {
        console.log('load home stat complete!');
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
    item.action();
  }
}
