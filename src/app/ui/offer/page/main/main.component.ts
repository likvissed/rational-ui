import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/ui/shared/services/storage.service';

import { getAuthUserAction } from './../../../shared/store/actions/get-auth-user.action';
import { Store, select } from '@ngrx/store';
import { getInfoUser } from './../../../shared/store/selectors';
import { Component, HostListener, AfterViewInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit  {
  items!: MenuItem[];
  tabs = {
    'tab1': false,
    'tab2': true
  };
  activeItem!: MenuItem;

  constructor(
    private store: Store,
    private storageService: StorageService
  ) { }

  ngAfterViewInit() {
    console.log('init main');
    this.storageService.onDeleteToken();
  }

  @HostListener('window:message', ['$event'])
  getToken(event: any) {
    console.log('getToken', event);

    if (this.onCheckToken(event)) {
      this.onGetInfoUser(event.data);
    }
  }

  onCheckToken(event: any): boolean {
    // TODO: Добавить обратно event.origin === environment.originUrl
    if (event.data['user_info'] && event.data['user_info'] != undefined) {
      return true;
    } else {
      return false;
    }
  } 

  onGetInfoUser(user: any) {
    this.store.dispatch(getAuthUserAction({ token: user }));

    this.store.pipe(select(getInfoUser))
      .subscribe((response: any) => {
        if (response) {
          this.storageService.onNewToken(response['jwt']);

          this.onInitial();
        }
      });
  }

  onInitial() {
    let user = this.storageService.getJwtPayload();

    if (!user) {
      return;
    }

    this.onFillMenu();
  }

  onFillMenu() {
    this.items = [
      { 
        label: 'Список предложений', 
        icon: 'pi pi-fw pi-align-justify',
        command: () => {
          this.tabs.tab1 = false;
          this.tabs.tab2 = true;
        } 
      },
      { 
        label: 'Заполнить форму', 
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.tabs.tab1 = true;
          this.tabs.tab2 = false;
        } 
      }
    ];

    this.activeItem = this.items[0];
  }
}
