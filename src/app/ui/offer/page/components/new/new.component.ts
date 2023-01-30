import { StorageService } from 'src/app/ui/shared/services/storage.service';
import { getAnalogsAction } from './../../../store/actions/get-analogs.action';
import { AnalogComponent } from './../analog/analog.component';
import { createOfferAction } from './../../../store/actions/create-offer.action';
import { selectNewOffer, getAnalogs, flagGetAnalogResponse, flagSuccessCreateOffer } from './../../../store/offer-selectors';
import { newOfferAction } from './../../../store/actions/new-offer.action';
import { searchUsers } from './../../../../shared/store/selectors';
import { findEmployeeAction } from './../../../../shared/store/actions/find-employee.action';

import { FileUpload } from 'primeng/fileupload'

import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() proposal = {};
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

  dataSubscription: Subscription = Subscription.EMPTY;

  isDisplaySuccessMsg: boolean = false;
  headerDisplaySuccessMsg = '';

  isValidUser: boolean = false;

  isShowWarningDept: boolean = false;

  countCoauthors: number = 10;

  isNewForm: boolean = true;

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
    this.isNewForm = true;

    this.onInitializeFrom();
    this.onInitializeValues();
  }

  ngOnChanges(changes: any) {
    this.isNewForm = false;

    this.onInitializeFrom();
    this.onInitializeValues();
    
    this.form.patchValue(changes.proposal.currentValue);

    let event = {
      value: changes.proposal.currentValue.trend_id
    };
    this.onChangeTrend(event);

    if (changes.proposal.currentValue.coauthor_info) {
      changes.proposal.currentValue.coauthor_info.forEach((object: any) => {
        this.allCoauthors.push(this.createUser(object));
      });
    }
  }

  onInitializeValues() {
    this.onGetNewOffer();
  }

  onGetNewOffer() {
    this.store.dispatch(newOfferAction());

    this.store.pipe(select(selectNewOffer))
      .subscribe((response: any) => {
        if (response) {
          this.form.controls['author_info'].setValue({
            id_tn: response.proposal.author_info.id_tn,
            fio: response.proposal.author_info.fio,
            phone: response.proposal.author_info.phone,
            dept: response.proposal.author_info.dept
          });

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
      id: new FormControl(''),

      author_info: this.formBuilder.group({
        id_tn: new FormControl(''),
        fio: new FormControl(''),
        phone: new FormControl(''),
        dept: new FormControl('')
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

  private createUser(obj?: any): FormGroup {
    if (obj) {
      return this.formBuilder.group({
        id_tn: new FormControl(obj['id_tn']),
        fio: new FormControl(obj['fio']),
        phone: new FormControl(obj['phone']),
        dept: new FormControl(obj['dept']),
        obj: new FormControl(obj)
      });
    } else {   
      return this.formBuilder.group({
        id_tn: new FormControl(''),
        fio: new FormControl(''),
        phone: new FormControl(''),
        dept: new FormControl(''),
        obj: new FormControl('')
      });
    }
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

  onCheckDept() {
    this.isShowWarningDept = false;

    let deptUser = this.form.value.author_info.dept;
    
    this.form.value.profile_depts.forEach((dept: any) => {
      if (dept == deptUser) {
        this.isShowWarningDept = true;
      }
    });
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

      this.messageService.add({severity: 'warn', summary: 'Внимание', detail: 'Заполнены не все обязательные поля' });
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

    this.store.dispatch(createOfferAction({ formData: this.formData, data: data, id: this.form.value.id }));

    this.dataSubscription = this.store.select(flagSuccessCreateOffer)
      .subscribe((flag: boolean) => {
        if (flag) {
          this.onOpenModalMsg();
        }
        
        this.dataSubscription.unsubscribe();
      });
  }

  onOpenModalMsg() {
    const action = this.isNewForm ? 'отправлено' : 'обновлено';
    this.headerDisplaySuccessMsg = `Рационализаторское предложение успешно ${action}`;

    this.isDisplaySuccessMsg = true;    
  }

  onSaveDraft() {
    this.storageService.onSetDraft(this.form.getRawValue());

    this.messageService.add({severity: 'success', summary: 'Успешно', detail: 'Черновик сохранен. Внимание: без файлов' });
  }

  onGetDraft() {
    let dataObj = this.storageService.onGetDraftForm();

    if (dataObj) {
      this.form.patchValue(dataObj);

      if (dataObj.coauthor_info) {
        this.allCoauthors.clear();

        dataObj.coauthor_info.forEach((object: any) => {
          this.allCoauthors.push(this.createUser(object));
        });
      }
  
    } else {
      this.messageService.add({severity: 'warn', summary: 'Внимание', detail: 'Сохраненных черновиков нет' });
    }
  }

  onSwitchTab() {
    window.location.reload();
  }
}
