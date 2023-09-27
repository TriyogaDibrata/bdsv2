import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from '@services/alert.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input() public files: string[];

  public pdfOptions: any = {
    zoom: 1.0,
    rotation: 0,
  };

  constructor(
    private modalCrtl: ModalController,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  public async closeModal() {
    await this.modalCrtl.dismiss();
  }

  zoomIn() {
    if (this.pdfOptions.zoom >= 2) {
      return;
    }

    this.pdfOptions.zoom += 0.1;
  }

  zoomOut() {
    if (this.pdfOptions.zoom <= 0.5) {
      return;
    }

    this.pdfOptions.zoom -= 0.1;
  }

  rotate() {
    if (this.pdfOptions.rotation >= 270) {
      this.pdfOptions.rotation = 0;
      return;
    }

    this.pdfOptions.rotation += 90;
  }

  onLoadError(ev) {
    this.alertService.showAlert({
      status: 'error',
      autoClose: false,
      showConfirmButton: true,
      title: ev.name,
      text: ev.message,
    });
  }
}
