import { getAnalogsAction } from './../../../store/actions/get-analogs.action';
import { AnalogComponent } from './../analog/analog.component';
import { createOfferAction } from './../../../store/actions/create-offer.action';
import { selectNewOffer, getAnalogs } from './../../../store/offer-selectors';
import { newOfferAction } from './../../../store/actions/new-offer.action';
import { searchUsers } from './../../../../shared/store/selectors';
import { findEmployeeAction } from './../../../../shared/store/actions/find-employee.action';

import { FileUpload } from 'primeng/fileupload'

import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers:[DynamicDialogRef, DynamicDialogConfig, DialogService]
})
export class NewComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  form!: FormGroup;
  employees$!: Observable<any>;
  analogs$: Observable<any> = of([]);
  trends: any = [];
  depts!: any;
  serials = [
    {
      name: 'Да',
      value: true
    },
    {
      name: 'Нет',
      value: false
    }
  ];
  maxSize: number = 20000000;
  formData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.onInitializeValues();
    this.onInitializeFrom();
  }

  onInitializeValues() {
    this.onGetNewOffer();
  }

  onGetNewOffer() {
    this.store.dispatch(newOfferAction());

    this.store.pipe(select(selectNewOffer))
      .subscribe((response: any) => {
        if (response) {
          this.form.patchValue(response.proposal);

          this.trends = response.data_filters.trends;
          this.depts = response.data_filters.depts;
        }
      });
  }

  onInitializeFrom() {
    this.form = this.formBuilder.group({
      author_info: this.formBuilder.group({
        id_tn: new FormControl('', [Validators.required]),
        fio: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        phone: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern("^[0-9\-]*$")]),
        dept: new FormControl('', [Validators.required, Validators.maxLength(10)])
      }),

      creation_datetime: new FormControl({ value: '', disabled: true }),

      coauthor_info: new FormControl(''),

      trend_id: new FormControl('', [Validators.required]),
      serial: new FormControl(true, [Validators.required]),
      profile_depts: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tags: new FormControl('', [Validators.required]),
      annotation: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      analogs: new FormControl([])
    });
  }

  searchEmployee(event: any) {
    if (this.form.value.coauthor_info.length <= 9) {
      this.store.dispatch(findEmployeeAction({ data: event.query.trim()}));
      this.employees$ = this.store.pipe(select(searchUsers));
    }
  }

  onAddNewTag(event: any) {
    if (event.value.length > 15) {
      this.form.value.tags.pop();

      // TODO: Добавить сообщение пользователю
    }
  }

  uploadFile(event: any) {
    for (let file of event.files) {
      this.formData.append(
        'file[]',
        file,
        file.name
      );
    }
  }

  onOpenAnalogs() {
    this.store.dispatch(getAnalogsAction({ data: this.form.getRawValue() }));

    this.analogs$ = this.store.select(getAnalogs);

    if (this.analogs$) {
      const ref = this.dialogService.open(AnalogComponent, {
        header: 'Выбор аналогов',
        width: '70%',
        data: {
          analogs: this.analogs$,
          presentAnalogs: this.form.value.analogs
        }
      });
  
      ref.onClose.subscribe((analogs: string[]) => {
        if (analogs) {
          this.form.controls['analogs'].setValue(analogs);
  
          this.onCreateOffer();
        }
      });
    }
  }

  onCreateOffer() {
    const nameData = 'proposal';

    this.fileUpload.upload();

    this.formData.delete(nameData);
    this.formData.append(nameData, JSON.stringify(this.form.getRawValue()));
    
    this.store.dispatch(createOfferAction({ data: this.formData }));
  }
}
