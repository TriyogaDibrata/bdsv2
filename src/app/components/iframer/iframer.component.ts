import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-iframer',
  templateUrl: './iframer.component.html',
  styleUrls: ['./iframer.component.scss'],
})
export class IframerComponent implements OnInit {
  @Input() url: string;
  @Input() title: string;
  public sanitizedUrl: SafeUrl;
  public scrollTop: number = 0;

  constructor(
    private sanitize: DomSanitizer,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.sanitizedUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.sanitizedUrl);
  }

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
