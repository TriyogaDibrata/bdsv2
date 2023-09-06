import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { DocThumb } from '@interfaces/doc-thumb';
import { NavController } from '@ionic/angular';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-signed-doc',
  templateUrl: './signed-doc.page.html',
  styleUrls: ['./signed-doc.page.scss'],
})
export class SignedDocPage implements OnInit {
  public docs: DocThumb[];
  public scrollTop: number = 0;

  constructor(
    private req: RequestService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.getSignedDoc();
  }

  private async getSignedDoc() {
    await this.req.apiGet('doc/riwatatttd', {}).subscribe({
      next: (res: ApiResponse) => {
        if (res) {
          this.docs = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('new doc load complete !');
      },
    });
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }
}
