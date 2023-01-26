import { StorageService } from 'src/app/ui/shared/services/storage.service';
import { getAnalogsAction } from './../../../store/actions/get-analogs.action';
import { AnalogComponent } from './../analog/analog.component';
import { createOfferAction } from './../../../store/actions/create-offer.action';
import { selectNewOffer, getAnalogs, flagGetAnalogResponse, flagSuccessCreateOffer } from './../../../store/offer-selectors';
import { newOfferAction } from './../../../store/actions/new-offer.action';
import { searchUsers } from './../../../../shared/store/selectors';
import { findEmployeeAction } from './../../../../shared/store/actions/find-employee.action';

import { FileUpload } from 'primeng/fileupload'

import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { Store, select, on } from '@ngrx/store';

import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';

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
  depts: any = [];
  serials: any = [];

  MAX_FILE_SIZE!: number;
  ID_TREND_TECHNICAL!: number;

  formData = new FormData();

  dataSubscription!: Subscription;

  isDisplaySuccessMsg: boolean = false;

  isValidUser: boolean = false;

  countCoauthors: number = 10;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    let user = this.storageService.getJwtPayload();

    if (!user) {
      return;
    }

    this.isValidUser = true;

    this.onInitializeFrom();
    this.onInitializeValues();
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
          this.serials = response.data_filters.serials;
          this.ID_TREND_TECHNICAL = response.data_filters.trend_technical_id;

          this.MAX_FILE_SIZE = response.constants.max_file_size;
        }
      });
  }

  onInitializeFrom() {
    this.form = this.formBuilder.group({
      author_info: this.formBuilder.group({
        id_tn: new FormControl('', [Validators.required]),
        fio: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(60)]),
        phone: new FormControl('', [Validators.required]),
        dept: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(10)])
      }),

      coauthor_info: this.formBuilder.array([]),

      trend_id: new FormControl('', [Validators.required]),
      serial: new FormControl(true, [Validators.required]),
      profile_depts: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tags: new FormControl('', [Validators.required]),
      annotation: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      analogs: new FormControl([]),

      proposed_analogs: new FormControl('')
    });
  }

  // ------------------ Coauthors ------------------

  searchEmployee(event: any) {
    if (this.form.value.coauthor_info.length <= this.countCoauthors) {
      this.store.dispatch(findEmployeeAction({ data: event.query.trim()}));

      this.employees$ = this.store.pipe(select(searchUsers));
    }
  }

  private createUser(): FormGroup {
    return this.formBuilder.group({
      id_tn: new FormControl('', [Validators.required]),
      fio: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      dept: new FormControl('', [Validators.required]),
      obj: new FormControl('')
    })
  }

  get allCoauthors(): FormArray {
    return this.form.get("coauthor_info") as FormArray;
  }

  onNewCoauthor() {
    if (this.allCoauthors.length >= 10) {
      this.messageService.add({ severity: 'warn', summary: 'Внимание', detail: `Максимальное число соавторов ${this.countCoauthors} шт.` });

      return;
    }

    this.allCoauthors.push(this.createUser());
  }

  onDeleteCoauthor(index: number) {
    this.allCoauthors.removeAt(index);
  }

  selectEmpCoauthor(event: any, index: number) {
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['id_tn'].setValue(event.id_tn);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['fio'].setValue(event.fio);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['dept'].setValue(event.dept);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['phone'].setValue(event.phone);
  }
  // -----------------------------------------------

  onAddNewTag(event: any) {
    let lengthForTag: number = 15;

    if (event.value.length > lengthForTag) {
      this.form.value.tags.pop();

      this.messageService.add({ severity: 'warn', summary: 'Внимание', detail: `Максимальная длина ключевого слова ${lengthForTag} символов` });
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

  onChangeTrend(event: any) {
    if (event.value == this.ID_TREND_TECHNICAL) {
      this.form.controls['profile_depts'].setValidators(Validators.required);
    } else {
      this.form.controls['profile_depts'].clearValidators();
    }

    this.form.controls['profile_depts'].updateValueAndValidity();
  }

  onMarkAsDirtyForm() {
    // TODO: Добавить проверку вложенным парметрам
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].markAsDirty();
    });
  }

  onLoadAnalogs() {
    this.store.dispatch(getAnalogsAction({ data: this.form.getRawValue() }));
  }

  onOpenAnalogs() {
    if (this.form.invalid) {
      this.onMarkAsDirtyForm();

      return;
    }
    
    this.onLoadAnalogs();
    this.analogs$ = this.store.select(getAnalogs);

    this.dataSubscription = this.store.select(flagGetAnalogResponse)
      .subscribe((flag: boolean) => {
        if (flag) {
          this.onOpenModalAddAnalogs();
        }
        
        this.dataSubscription.unsubscribe();
      });
  }

  onOpenModalAddAnalogs() {
    const ref = this.dialogService.open(AnalogComponent, {
      header: 'Выбор аналогов',
      width: '70%',
      closable: false,
      data: {
        analogs: this.analogs$,
        presentAnalogs: this.form.value.analogs
      }
    });

    ref.onClose.subscribe((data: any) => {
      if (data) {
        this.form.controls['analogs'].setValue(data.analogs);

        this.analogs$
          .subscribe((response: any) => {
            if (response) {
              this.form.controls['proposed_analogs'].setValue(response);
            }
          });

        if (data.save) {
          this.onCreateOffer();
        }
      }
    });
  }
  
  onCreateOffer() {
    let data = this.form.getRawValue();
    const nameData = 'proposal';

    this.fileUpload.upload();
    
    this.formData.delete(nameData);
    this.formData.append(nameData, JSON.stringify(data));
    
    this.store.dispatch(createOfferAction({ formData: this.formData, data: data }));

    this.dataSubscription = this.store.select(flagSuccessCreateOffer)
      .subscribe((flag: boolean) => {
        if (flag) {
          this.onOpenModalMsg();
        }
        
        this.dataSubscription.unsubscribe();
      });
  }

  onOpenModalMsg() {
    this.isDisplaySuccessMsg = true;    
  }
}
