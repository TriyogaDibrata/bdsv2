import { Component, OnInit } from '@angular/core';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-sheet-menu',
  templateUrl: './sheet-menu.component.html',
  styleUrls: ['./sheet-menu.component.scss'],
})
export class SheetMenuComponent implements OnInit {
  constructor(public menu: MenuService) {}

  ngOnInit() {}

  handleMenuOnClick(item) {
    if (item.action) {
      item.action();
    }
    return;
  }
}
