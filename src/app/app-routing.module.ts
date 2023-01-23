import { LayoutModule } from './ui/layout/modules/layout.module';

import { LayoutComponent } from './ui/layout/page/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCenterGuard } from '@iss/ng-auth-center';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthCenterGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: (): Promise<any> => import('src/app/ui/offer/modules/offer.module').then((modules) => modules.OfferModule),
      },
      {
        path: 'offer',
        loadChildren: (): Promise<any> => import('src/app/ui/offer/modules/offer.module').then((modules) => modules.OfferModule),
      },
    ]
  }
];


@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
