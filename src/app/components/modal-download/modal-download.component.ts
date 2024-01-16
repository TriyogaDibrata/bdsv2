import { Component, Input, OnInit } from '@angular/core';
import { FileOpener } from '@capacitor-community/file-opener';
import { CanShareResult, Share } from '@capacitor/share';

@Component({
  selector: 'app-modal-download',
  templateUrl: './modal-download.component.html',
  styleUrls: ['./modal-download.component.scss'],
})
export class ModalDownloadComponent implements OnInit {
  @Input() public data: { name: string; path: string };

  constructor() {}

  ngOnInit() {}

  async openFile() {
    const fileOpener = await FileOpener.open({
      filePath: this.data.path,
      contentType: 'application/pdf',
    });
  }

  async shareFile() {
    const canShare: CanShareResult = await Share.canShare();
    if (canShare.value) {
      await Share.share({
        title: this.data.name,
        url: this.data.path,
      });
    }
    return;
  }
}
