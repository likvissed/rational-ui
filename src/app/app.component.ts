import { primeLocale } from './lib/primeng.locale';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.config.setTranslation(primeLocale);
  }

}
