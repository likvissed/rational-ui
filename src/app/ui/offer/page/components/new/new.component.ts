import { createOfferAction } from './../../../store/actions/create-offer.action';
import { selectNewOffer } from './../../../store/offer-selectors';
import { newOfferAction } from './../../../store/actions/new-offer.action';
import { searchUsers } from './../../../../shared/store/selectors';
import { findEmployeeAction } from './../../../../shared/store/actions/find-employee.action';

import { FileUpload } from 'primeng/fileupload'

import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  form!: FormGroup;
  employees$!: Observable<any>;
  trends!: any;
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
    private store: Store
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

      coauthor_info: this.formBuilder.array([], [Validators.required]),

      files: new FormControl(''),

      trend_id: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
      profile_depts: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tags: new FormControl('', [Validators.required]),
      annotation: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      analog_id: new FormControl('')
    });
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
    this.allCoauthors.push(this.createUser());
  }

  onDeleteCoauthor(index: number) {
    this.allCoauthors.removeAt(index);
  }

  searchEmployee(event: any) {
    this.store.dispatch(findEmployeeAction({ data: event.query.trim()}));
    this.employees$ = this.store.pipe(select(searchUsers));
  }

  selectEmpCoauthor(event: any, index: number) {
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['id_tn'].setValue(event.id_tn);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['fio'].setValue(event.fio);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['dept'].setValue(event.dept);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['phone'].setValue(event.phone);
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

  onCreateOffer() {
    const nameData = 'proposal';

    this.fileUpload.upload();

    this.formData.delete(nameData);
    this.formData.append(nameData, JSON.stringify(this.form.getRawValue()));
    
    this.store.dispatch(createOfferAction({ data: this.formData }));
  }
}
