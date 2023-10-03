import { Component, OnInit } from '@angular/core';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public scrollTop: number = 0;
  constructor(public menu: MenuService) {}

  ngOnInit() {}

  handleScroll(e) {
    this.scrollTop = e.detail.scrollTop;
  }
}
