import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { MailThumb } from '@interfaces/mail-thumb';
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

  constructor(
    private req: RequestService,
    public loader: LoadingService,
    private alertService: AlertService,
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
}
