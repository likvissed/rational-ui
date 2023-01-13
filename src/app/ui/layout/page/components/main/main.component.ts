import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.onFillMenu();
  }

  onFillMenu() {
    this.items = [
      { label: 'Список предложений', icon: 'pi pi-fw pi-align-justify', routerLink: ['/offer/list'] },
      { label: 'Заполнить форму', icon: 'pi pi-fw pi-pencil', routerLink: ['/offer/new'] }
    ];
  }


}
