import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.onInitializeValues();
    this.onInitializeFrom();
  }

  onInitializeValues() {
  }

  onInitializeFrom() {
    this.form = this.formBuilder.group({
      // author_info: this.formBuilder.group({
      //   id_tn: new FormControl(getData.proposal.author_info.id_tn, [Validators.required]),
      //   fio: new FormControl(getData.proposal.author_info.fio, [Validators.required, Validators.maxLength(60)]),
      //   phone: new FormControl(getData.proposal.author_info.phone, [Validators.required, Validators.maxLength(20), Validators.pattern("^[0-9\-]*$")]),
      //   dept: new FormControl(getData.proposal.author_info.dept, [Validators.required, Validators.maxLength(10)])
      // }),

      // creation_datetime: new FormControl({ value: getData.proposal.creation_datetime, disabled: true }),

      coauthor_info: this.formBuilder.array([], [Validators.required]),

      trend_id:  new FormControl('', [Validators.required]),
      serial:  new FormControl('', [Validators.required]),
      profile_depts: new FormControl(''),
      information_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tags: new FormControl('', [Validators.required]),
      annotation: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      analog_id: new FormControl('', [Validators.required])
    });
  }

  private createUser(): FormGroup {
    return this.formBuilder.group({
      id_tn: new FormControl('', [Validators.required]),
      fio: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      dept: new FormControl('', [Validators.required])
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
    // this.store.dispatch(findEmployeeAction({ data: event.query.trim()}));
    // this.employees$ = this.store.pipe(select(searchUsers));
  }

  selectEmpSign(event: any, index: number) {
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['id_tn'].setValue(event.id_tn);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['fio'].setValue(event.fio);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['dept'].setValue(event.dept);
    (((<FormArray>this.form.controls['coauthor_info']).at(index)) as FormGroup).controls['phone'].setValue(event.phone);
  }
}
