import { Observable } from 'rxjs';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analog',
  templateUrl: './analog.component.html',
  styleUrls: ['./analog.component.scss']
})
export class AnalogComponent implements OnInit {
  allAnalogs: string[] = [];
  proposedAnalogs$!: Observable<any>;
  selectedAnalog: string = '';
  newAnalogs: string[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.onInitializeValues();
  }
  
  onInitializeValues() {
    this.proposedAnalogs$ = this.config.data?.analogs;

    this.newAnalogs = [...this.config.data?.presentAnalogs]
  }

  onAddAnalog() {
    if (this.newAnalogs.length >= 5) {
      return;
    }

    if (this.selectedAnalog.trim() && this.onCheckUniq()) {
      this.newAnalogs.push(this.selectedAnalog);

      this.selectedAnalog = '';
    }
  }

  onCheckUniq() {
    let not_uniq =  this.newAnalogs.find((x: string) => x == this.selectedAnalog);

    return not_uniq == undefined ? true : false
  }

  onDeleteAnalog(name: string) {
    let index = this.newAnalogs.indexOf(name);

    if (index !== -1) {
      this.newAnalogs.splice(index, 1);
    }
  }
  
  onSendAnalog() {
    this.ref.close(this.newAnalogs);
  }

  onCloseModal() {
    this.ref.close();
  }

}
