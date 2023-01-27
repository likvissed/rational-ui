import { updateRowListAction } from './../../../store/actions/update_row_list.action';
import { switchMap, map } from 'rxjs/operators';
import { StorageService } from 'src/app/ui/shared/services/storage.service';
import { downloadFileAction } from './../../../store/actions/download-file.action';
import { getLists, selectFiltersLists } from './../../../store/offer-selectors';
import { getListsAction } from './../../../store/actions/get-lists.action';

import { Store, select } from '@ngrx/store';

import { Observable, of } from 'rxjs';

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
    serials: [],
    depts: []
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

  isDisplayAnalogs: boolean = false;
  analogs = {
    name: '',
    lists: []
  };

  user = {
    role: {
      name: '',
      value: ''
    }
  };

  MAX_FILE_SIZE!: number;
  ID_STATUS_REJECT!: number;

  constructor(
    private store: Store,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let user = this.storageService.getJwtPayload();
    
    if (!user) {
      return;
    }
  
    this.onGetJwtPayload(user);
    this.onInitializeValues();
  }

  onGetJwtPayload(currentUser: any) {
    this.user.role.value = currentUser['role']['value'];
    this.user.role.name = currentUser['role']['name'];
  }

  onInitializeValues() {
    this.store.dispatch(getListsAction());

    this.onLoadLists();
    this.onLoadFilters();
  }

  onLoadLists() {
    this.lists$ = this.store.pipe(
      select(getLists),
      map((response: any ) => {
        if (response) {
          return response.map((data: any) => Object.assign({}, data));
        }
      })
    )
  }

  onLoadFilters() {
    this.store.pipe(select(selectFiltersLists))
      .subscribe((data: any) => {
        if (data.isLoadLists) {
          this.filters.trends = data.filters.data_filters.trends;
          this.filters.statuses = data.filters.data_filters.statuses;
          this.filters.serials = data.filters.data_filters.serials;
          this.filters.depts = data.filters.data_filters.depts;

          this.MAX_FILE_SIZE = data.filters.constants.max_file_size;
          this.ID_STATUS_REJECT = data.filters.data_filters.status_reject_id;
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

  onShowAnalogs(name: string, analogs: any) {
    this.analogs.name = `Аналоги рацпредложения:  ${name}`;
    this.analogs.lists = analogs;

    this.isDisplayAnalogs = true;
  }

  onChangeStatus(event: any, row: any) {
    if (event.value == this.ID_STATUS_REJECT) {
      let text = prompt('Введите причину отклонения:', '');
      
      row.reason_for_rejection = text;
    }
  }
  
  onRowEditSave(row: any) {
    this.store.dispatch(updateRowListAction({ data: row }));
  }
  
}
