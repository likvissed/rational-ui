import { NgModule } from '@angular/core';

import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';

const modules: any[] = [
  TabMenuModule,
  InputTextModule,
  ButtonModule,
  TableModule,
  AutoCompleteModule,
  DropdownModule,
  MultiSelectModule,
  ChipModule,
  ChipsModule,
  InputTextareaModule,
  FileUploadModule,
  DividerModule,
  DialogModule,
  InputMaskModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  MenuModule,
  ConfirmDialogModule,
  CalendarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [],
  providers: []
})
export class PrimengModule {}
