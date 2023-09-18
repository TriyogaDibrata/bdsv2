import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '@interfaces/api-response';
import { NavController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-detail-mail',
  templateUrl: './detail-mail.page.html',
  styleUrls: ['./detail-mail.page.scss'],
})
export class DetailMailPage implements OnInit {
  public scrollTop: number;
  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    let doc_id = this.route.snapshot.paramMap.get('id');
    let inbox_id = this.route.snapshot.paramMap.get('inbox_id');
    let url = 'surat/detail/' + doc_id;
    if (inbox_id) {
      url = url + '/' + inbox_id;
    }
    this.getDetailDoc(url);
  }

  private async getDetailDoc(url) {
    await this.req.apiGet(url, {}).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          console.log(res);
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

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }
}
