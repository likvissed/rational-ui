import { RouterModule } from '@angular/router';

import { LayoutComponent } from '../page/layout/layout.component';
import { MainComponent } from '../page/components/main/main.component';
import { HeaderComponent } from '../page/components/header/header.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/primeng.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PrimengModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent
  ],
  exports: [
    LayoutComponent
  ],
})
export class LayoutModule { }
