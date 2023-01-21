import { downloadFileAction } from './../../../store/actions/download-file.action';
import { getLists, selectFiltersLists } from './../../../store/offer-selectors';
import { getListsAction } from './../../../store/actions/get-lists.action';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';


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
    serials: [
      {
        name: 'Да',
        value: true
      },
      {
        name: 'Нет',
        value: false
      } 
    ]
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
  }

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.onInitializeValues();
  }

  onInitializeValues() {
    this.store.dispatch(getListsAction());

    this.onLoadLists();
    this.onLoadFilters();
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
          // TODO: Поменять после изменений на сервере + строка 21
          // this.filters.serials = data.serials;
        }
    });
  } 

  // ------------------ Files ------------------
  private createItemFile(item: any) {
    return {
      label: item.filename,
      icon: 'pi pi-download',
      command: () => {
        this.onDownloadFile(item.id);
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

  onDownloadFile(id: number) {
    this.store.dispatch(downloadFileAction({ id: id }));
  }
  // -------------------------------------------

  onShowCoauthors(name: string, coauthoars: any) {
    this.coauthors.name = `Соавторы рац.предложения:  ${name}`;
    this.coauthors.lists = coauthoars;

    this.isDisplayCoauthors = true;
  }

  onShowAnnotation(name: string, text: string) {
    this.annotation.name = `Аннотация рац.предложения:  ${name}`;
    this.annotation.text = text;

    this.isDisplayAnnotation = true;
  }

}
