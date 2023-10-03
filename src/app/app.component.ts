import { Component } from '@angular/core';
import { TextZoom } from '@capacitor/text-zoom';
import { TextService } from '@services/text.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private textService: TextService) {
    this.setTextSize();
  }

  setTextSize() {
    if (this.textService.zoomValue) {
      TextZoom.set({ value: this.textService.zoomValue });
    }
  }
}
