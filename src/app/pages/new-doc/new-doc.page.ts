import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@interfaces/api-response';
import { DocThumb } from '@interfaces/doc-thumb';
import { NavController } from '@ionic/angular';
import { RequestService } from '@services/request.service';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.page.html',
  styleUrls: ['./new-doc.page.scss'],
})
export class NewDocPage implements OnInit {
  public docs: DocThumb[];
  public scrollTop: number = 0;

  constructor(
    private req: RequestService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.getNewDoc();
  }

  private async getNewDoc() {
    await this.req.apiGet('doc/belumttd', {}).subscribe({
      next: (res: ApiResponse) => {
        if (res.success && res.data) {
          this.docs = res.data.docs.data;
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
