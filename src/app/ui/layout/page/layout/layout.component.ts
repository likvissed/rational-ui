import { primeLocale } from './../../../../lib/primeng.locale';
import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.config.setTranslation(primeLocale);
  }

}
