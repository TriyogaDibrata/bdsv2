import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { DocumentThubmnailComponent } from './document-thubmnail/document-thubmnail.component';
import { SheetMenuComponent } from './sheet-menu/sheet-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SheetActionComponent } from './sheet-action/sheet-action.component';
import { AckComponent } from './ack/ack.component';
import { SignComponent } from './sign/sign.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { MailThumbnailComponent } from './mail-thumbnail/mail-thumbnail.component';
import { SentThumbnailComponent } from './sent-thumbnail/sent-thumbnail.component';
import { AgendaSummaryComponent } from './agenda-summary/agenda-summary.component';
import { AgendaDetailComponent } from './agenda-detail/agenda-detail.component';
import { UploadLaporanAgendaComponent } from './upload-laporan-agenda/upload-laporan-agenda.component';
import { ModalActionDisposisiComponent } from './modal-action-disposisi/modal-action-disposisi.component';
import { ModalRiwayatDisposisiComponent } from './modal-riwayat-disposisi/modal-riwayat-disposisi.component';
import { ModalUplaodDisposisiComponent } from './modal-uplaod-disposisi/modal-uplaod-disposisi.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

const _COMPONENTS = [
  BackButtonComponent,
  DocumentThubmnailComponent,
  SheetMenuComponent,
  PdfViewerComponent,
  SheetActionComponent,
  AckComponent,
  SignComponent,
  ModalAlertComponent,
  SkeletonComponent,
  MailThumbnailComponent,
  SentThumbnailComponent,
  AgendaSummaryComponent,
  AgendaDetailComponent,
  UploadLaporanAgendaComponent,
  ModalActionDisposisiComponent,
  ModalRiwayatDisposisiComponent,
  ModalUplaodDisposisiComponent,
  ModalLogoutComponent,
  DatePickerComponent,
];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgSelectModule,
  ],
  exports: [_COMPONENTS],
})
export class ComponentsModule {}
