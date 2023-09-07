import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerComponent } from '@components/pdf-viewer/pdf-viewer.component';
import { ApiResponse } from '@interfaces/api-response';
import { DocDetail } from '@interfaces/doc-detail';
import { ModalController, NavController } from '@ionic/angular';
import { RequestService } from '@services/request.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {
  private doc_id: string;
  public scrollTop: number;
  public detailDoc: DocDetail;

  constructor(
    private route: ActivatedRoute,
    private req: RequestService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    moment.locale('ID');
    this.doc_id = this.route.snapshot.paramMap.get('id');
    if (this.doc_id) {
      this.getDetail(this.doc_id);
    }
  }

  public async getDetail(id) {
    await this.req.apiGet('doc/' + id).subscribe({
      next: (res: ApiResponse) => {
        if (res && res.success) {
          this.detailDoc = res.data.doc;
          console.log(this.detailDoc);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('get detail load complete !');
      },
    });
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  public convertDate(date) {
    return moment(date).format('dddd, DD MMMM YYYY');
  }

  public async showPdfViewer(data) {
    console.log(data);
    const modal = await this.modalCtrl.create({
      component: PdfViewerComponent,
    });
    await modal.present();
  }
}
