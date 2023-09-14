import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { DocThumb } from '@interfaces/doc-thumb';
import { NavController } from '@ionic/angular';
import { LoadingService } from '@services/loading.service';
import { RequestService } from '@services/request.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-signed-doc',
  templateUrl: './signed-doc.page.html',
  styleUrls: ['./signed-doc.page.scss'],
})
export class SignedDocPage implements OnInit {
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

  constructor(
    private req: RequestService,
    public navCtrl: NavController,
    public loader: LoadingService,
  ) {}

  ngOnInit() {
    this.prepareInitialData();
  }

  public handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  public async prepareInitialData() {
    return await this.getSignedDoc().subscribe({
      next: (res: ApiResponse) => {
        if (res) {
          this.docs = res.data;
          if (res['next_page_url']) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getSignedDoc() {
    let params = {
      page: this.infiniteScrollData.page,
      search: this.search.value,
    };
    return this.req.apiGet('doc/riwatatttd', params).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  public async loadMore(ev) {
    return await this.getSignedDoc().subscribe({
      next: (res: ApiResponse) => {
        if (res) {
          res.data.forEach((el) => {
            this.docs.push(el);
          });
          if (res['next_page_url']) {
            this.infiniteScrollData.enable = true;
            this.infiniteScrollData.page++;
          } else {
            this.infiniteScrollData.enable = false;
          }
        }
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
