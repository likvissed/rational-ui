import { NewComponent } from './../components/new/new.component';
import { ListComponent } from './../components/list/list.component';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/ui/shared/services/storage.service';

import { getAuthUserAction } from './../../../shared/store/actions/get-auth-user.action';
import { Store, select } from '@ngrx/store';
import { getInfoUser } from './../../../shared/store/selectors';
import { Component, HostListener, AfterViewInit, ViewChild } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit  {
  @ViewChild(ListComponent) childList: any;
  @ViewChild(NewComponent) childNew: any;

  items!: MenuItem[];
  objProposal = {};
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
    this.storageService.onDeleteToken();
  }

  @HostListener('window:message', ['$event'])
  getToken(event: any) {
    if (this.onCheckToken(event)) {
      this.onGetInfoUser(event.data);
    }
  }
  
  onCheckToken(event: any): boolean {
    console.log('getToken', (event.data['user_info']));

    if (event.data['user_info'] && event.data['user_info'] != undefined && this.onValidOrigin(event.origin)) {
      return true;
    } else {
      return false;
    }
  }

  onValidOrigin(getOrigin: any): boolean {
    let object = environment.originUrls.find((obj: any) => obj === getOrigin);

    return object ? true : false;
  }

  onGetInfoUser(user: any) {
    this.store.dispatch(getAuthUserAction({ token: user }));
    
    this.store.pipe(select(getInfoUser))
    .subscribe((response: any) => {
        if (response && response['jwt']) {
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

    this.childList.ngOnInit();
    this.childNew.ngOnInit();
  }

  public onSwitchTab(data: any): void {
    this.objProposal = data;

    this.tabs.tab1 = true;
    this.tabs.tab2 = false;

    this.activeItem = this.items[1];
  }

  onFillMenu() {
    this.items = [
      { 
        label: '???????????? ??????????????????????', 
        icon: 'pi pi-fw pi-align-justify',
        command: () => {
          this.tabs.tab1 = false;
          this.tabs.tab2 = true;

          this.activeItem = this.items[0];
        } 
      },
      { 
        label: '?????????????????? ??????????', 
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.tabs.tab1 = true;
          this.tabs.tab2 = false;

          this.activeItem = this.items[1];
        } 
      }
    ];

    this.activeItem = this.items[0];
  }
}
