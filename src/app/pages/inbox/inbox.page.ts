import { Component, OnInit } from '@angular/core';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { ApiResponse } from '@interfaces/api-response';
import { MailThumb } from '@interfaces/mail-thumb';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  public scrollTop: number = 0;
  public infiniteScrollData: any = {
    enable: false,
    page: 1,
  };
  public search: any = {
    limit: 30,
    value: '',
  };
  public mails: MailThumb[];

  showDateInput: boolean = false;
  selectedStartDate: Date;
  selectedEndDate: Date;
  emptyDate: Date;
  roles = [];
  selectedRole: number;

  constructor(
    private req: RequestService,
    public loader: LoadingService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.prepareInitialData();
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  private async prepareInitialData() {
    (await this.getInbox()).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.mails = res.data.surat.data;
          this.roles = res.data.roles;
          if (res.data.surat.next_page_url) {
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
          title: 'Something went wrong',
          text: err.message,
        });
      },
    });
  }

  private async getInbox() {
    let params = {
      page: this.infiniteScrollData.page,
      search: this.search.value,
      start: this.selectedStartDate ? this.selectedStartDate : '',
      end: this.selectedEndDate ? this.selectedEndDate : '',
      role: this.selectedRole ? this.selectedRole : '',
    };
    return this.req.apiGet('surat/inbox', params).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  public async loadMore(ev) {
    return (await this.getInbox()).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          res.data.surat.data.forEach((el) => {
            this.mails.push(el);
          });
          if (res.data.surat.next_page_url) {
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
          title: 'Something went wrong',
          text: err.message,
        });
      },
      complete: () => {
        ev.target.complete();
      },
    });
  }

  public async searchData() {
    this.infiniteScrollData.enable = false;
    this.infiniteScrollData.page = 1;
    await this.prepareInitialData();
  }

  onInputCleared(ev) {
    this.searchData();
  }

  onInputChanged(ev) {
    let value = ev.target.value;
    if (value < 1) {
      this.searchData();
    }
  }

  resetSearch() {
    this.search.value = '';
    this.selectedStartDate = this.emptyDate;
    this.selectedEndDate = this.emptyDate;
    this.selectedRole = null;
    this.searchData();
  }

  toggleDateInput() {
    this.showDateInput = !this.showDateInput;
  }

  async selectStartDate() {
    const modal = await this.modalCtrl.create({
      component: DatePickerComponent,
      componentProps: {
        value: this.selectedStartDate,
        max: this.selectedEndDate,
      },
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    let onDismiss = await modal.onDidDismiss();

    if (onDismiss.role == 'confirm') {
      this.selectedStartDate = onDismiss.data;
    } else if (onDismiss.role == 'reset') {
      this.selectedStartDate = null;
    }
  }

  async selectEndDate() {
    const modal = await this.modalCtrl.create({
      component: DatePickerComponent,
      componentProps: {
        value: this.selectedEndDate,
        min: this.selectedStartDate,
      },
      breakpoints: [1, 0],
      initialBreakpoint: 1,
      cssClass: 'modal-sheet-auto-height',
    });

    await modal.present();

    let onDismiss = await modal.onDidDismiss();

    if (onDismiss.role == 'confirm') {
      this.selectedEndDate = onDismiss.data;
    } else if (onDismiss.role == 'reset') {
      this.selectedEndDate = null;
    }
  }
  async handleRefresh(ev) {
    this.infiniteScrollData.enable = false;
    this.infiniteScrollData.page = 1;

    (await this.getInbox()).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.mails = res.data.surat.data;
          this.roles = res.data.roles;
          if (res.data.surat.next_page_url) {
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
          title: 'Something went wrong',
          text: err.message,
        });
      },
      complete: () => {
        ev.target.complete();
      },
    });
  }
}
