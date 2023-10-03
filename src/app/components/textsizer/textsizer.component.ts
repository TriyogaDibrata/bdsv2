import { Component, OnInit } from '@angular/core';
import { TextZoom } from '@capacitor/text-zoom';
import { TextService } from '@services/text.service';

@Component({
  selector: 'app-textsizer',
  templateUrl: './textsizer.component.html',
  styleUrls: ['./textsizer.component.scss'],
})
export class TextsizerComponent implements OnInit {
  barValue: any;
  constructor(private textService: TextService) {}

  async ngOnInit() {
    const current = await TextZoom.get();
    this.barValue = current.value * 4;
  }

  async onRangeChange(ev) {
    this.barValue = ev.target.value;
    let zoomValue = this.barValue * 0.25;
    await TextZoom.set({ value: zoomValue });
    this.textService.storeZoomData(zoomValue);
  }
}
