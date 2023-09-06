import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {
  private doc_id: string;
  public scrollTop: number;

  constructor(
    private route: ActivatedRoute,
    private req: RequestService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.doc_id = this.route.snapshot.paramMap.get('id');
    if (this.doc_id) {
      this.getDetail(this.doc_id);
    }
  }

  public async getDetail(id) {
    await this.req.apiGet('doc/' + id).subscribe({
      next: (res) => {
        console.log(res);
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
}
