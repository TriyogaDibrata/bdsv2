import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { MailThumb } from '@interfaces/mail-thumb';
import { SentThumb } from '@interfaces/sent-thumb';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {
  public scrollTop: number = 0;
  public infiniteScrollData: any = {
    enable: false,
    page: 1,
  };
  public search: any = {
    limit: 30,
    value: '',
  };
  public mails: SentThumb[];

  constructor(
    private req: RequestService,
    public loader: LoadingService,
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
          console.log(this.mails);
          if (res.data.surat.next_page_url) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          }
        }
        console.log(this.infiniteScrollData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private async getInbox() {
    let params = {
      page: this.infiniteScrollData.page,
      search: this.search.value,
    };
    return this.req.apiGet('surat/outbox', params).pipe(
      map((res) => {
        console.log(res);
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
        console.log(this.infiniteScrollData);
      },
      error: (err) => {
        console.log(err);
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
