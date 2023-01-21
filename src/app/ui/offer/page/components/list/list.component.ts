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

  // ---------------- Coauthors ----------------
  private createItemCoauthor(item: any, index: number) {
    return {
      label: `${index + 1}. ${item.fio} (${item.dept})`
    }
  }

  onGeListCoauthors(data: any) {
    let array: any = [];

    data.forEach((element: any, index: number) => {
      array.push(this.createItemCoauthor(element, index));
    });

    return array;
  }
  // -------------------------------------------

  onShowAnnotation(name: string, text: string) {
    this.annotation.name = `Аннотация рац.предложения:  ${name}`;
    this.annotation.text = text;

    this.isDisplayAnnotation = true;
  }

}
