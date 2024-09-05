import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { UserJobManageComponent } from './user-job-manage.component';
import { UserJobManageRoutingModule } from './user-job-manage-routing.module';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [UserJobManageComponent],
  imports: [
    CommonModule,
    UserJobManageRoutingModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    FormsModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule
  ]
})
export class UserJobManageModule { }
