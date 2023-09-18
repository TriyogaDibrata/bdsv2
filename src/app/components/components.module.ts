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
];

@NgModule({
  declarations: [_COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
  ],
  exports: [_COMPONENTS],
})
export class ComponentsModule {}
