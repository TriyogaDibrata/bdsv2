import { Component, OnInit } from '@angular/core';
import { DatePickerComponent } from '@components/date-picker/date-picker.component';
import { ApiResponse } from '@interfaces/api-response';
import { DocThumb } from '@interfaces/doc-thumb';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import * as moment from 'moment';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.page.html',
  styleUrls: ['./new-doc.page.scss'],
})
export class NewDocPage implements OnInit {
  public docs: DocThumb[];
  public scrollTop: number = 0;
  public infiniteScrollData: any = {
    enable: false,
    page: 1,
  };
  public search: any = {
    limit: 30,
    value: '',
  };
  showDateInput: boolean = false;
  selectedStartDate: Date;
  selectedEndDate: Date;
  emptyDate: Date;

  constructor(
    private req: RequestService,
    public navCtrl: NavController,
    public loader: LoadingService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.prepareInitialData();
  }

  private async prepareInitialData() {
    return (await this.getNewDoc()).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.docs = res.data.docs.data;
          if (res.data.docs.next_page_url) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          }
        }
      },
      error: (err) => {
        this.alertService
          .showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: err?.statusText,
            text: err?.message,
          })
          .then(() => {
            this.navCtrl.pop();
          });
      },
    });
  }

  private async getNewDoc() {
    let params = {
      page: this.infiniteScrollData.page,
      search: this.search.value,
      start: this.selectedStartDate ? this.selectedStartDate : '',
      end: this.selectedEndDate ? this.selectedEndDate : '',
    };
    return this.req.apiGet('doc/belumttd', params).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  public async loadMore(ev) {
    return (await this.getNewDoc()).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          res.data.docs.data.forEach((el) => {
            this.docs.push(el);
          });
          if (res.data.docs.next_page_url) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          } else {
            this.infiniteScrollData.enable = false;
          }
        }
      },
      error: (err) => {
        this.alertService
          .showAlert({
            status: 'error',
            autoClose: false,
            showConfirmButton: true,
            title: err?.statusText,
            text: err?.message,
          })
          .then(() => {
            this.navCtrl.pop();
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

  resetSearch() {
    this.search.value = '';
    this.selectedStartDate = this.emptyDate;
    this.selectedEndDate = this.emptyDate;
    this.searchData();
  }

  onInputChanged(ev) {
    let value = ev.target.value;
    if (value < 1) {
      this.searchData();
    }
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
}
