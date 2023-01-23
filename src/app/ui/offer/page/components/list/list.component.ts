import { downloadFileAction } from './../../../store/actions/download-file.action';
import { getLists, selectFiltersLists } from './../../../store/offer-selectors';
import { getListsAction } from './../../../store/actions/get-lists.action';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { AuthHelper } from '@iss/ng-auth-center';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists$!: Observable<any>;
  filters = {
    trends: [],
    statuses: [],
    serials: []
  };

  isDisplayAnnotation: boolean = false;
  annotation = {
    name: '',
    text: ''
  }

  isDisplayCoauthors: boolean = false;
  coauthors = {
    name: '',
    lists: []
  };

  user = {
    role: {
      name: '',
      value: ''
    }
  };

  constructor(
    private store: Store,
    private authHelper: AuthHelper
  ) { }

  ngOnInit() {
    this.onInitializeValues();
  }

  onInitializeValues() {
    this.onGetJwtPayload();

    this.store.dispatch(getListsAction());

    this.onLoadLists();
    this.onLoadFilters();
  }

  onGetJwtPayload() {
    this.user.role.value = this.authHelper.getJwtPayload()['role']['value'];
    this.user.role.name = this.authHelper.getJwtPayload()['role']['name'];
  }

  onLoadLists() {
    this.lists$ = this.store.select(getLists);
  }

  onLoadFilters() {
    this.store.pipe(select(selectFiltersLists))
      .subscribe((data: any) => {
        if (data) {
          this.filters.trends = data.trends;
          this.filters.statuses = data.statuses;
          this.filters.serials = data.serials;
        }
    });
  } 

  // ------------------ Files ------------------
  private createItemFile(item: any) {
    return {
      label: item.filename,
      icon: 'pi pi-download',
      command: () => {
        this.onDownloadFile(item.id, item.filename);
      }
    }
  }

  onGeListFiles(files: any) {
    let array: any = [];

    files.forEach((element: any) => {
      array.push(this.createItemFile(element));
    });

    return array;
  }

  onDownloadFile(id: number, name: string) {
    this.store.dispatch(downloadFileAction({ id: id, filename: name }));
  }
  // -------------------------------------------

  onShowCoauthors(name: string, coauthoars: any) {
    this.coauthors.name = `Соавторы рацпредложения:  ${name}`;
    this.coauthors.lists = coauthoars;

    this.isDisplayCoauthors = true;
  }

  onShowAnnotation(name: string, text: string) {
    this.annotation.name = `Аннотация рацпредложения:  ${name}`;
    this.annotation.text = text;

    this.isDisplayAnnotation = true;
  }

}
