import { Component, OnInit } from '@angular/core';
import { UserJobManageService } from '@service/user-job-manage.service';
import { UserInfo, UserJobList } from '@uofmodule/user-job.module';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-user-job-manage',
    templateUrl: './user-job-manage.component.html',
    styleUrls: ['./user-job-manage.component.scss'],
    providers: [MessageService]
})
export class UserJobManageComponent implements OnInit {
    accountId: string = 'TW10622';

    intentAccountId: string = '';

    userInfo: UserInfo = null;

    intentUserInfo: UserInfo = null;

    userJobLists: UserJobList[] = [];

    selectedUserJobLists: any = [];

    copyJobAmount: number = 0;

    targetConfirmDialog: boolean = false;

    descriptionDialog: boolean = false;

    description: string = null;

    constructor(private UserJobManageService: UserJobManageService, private Messageservice: MessageService) { }

    ngOnInit(): void {

    }

    getUserInfo() {
        const postData = { account: this.accountId };

        this.selectedUserJobLists = null;

        this.UserJobManageService.getUofUserInfo(postData)
            .subscribe({
                next: (date) => {
                    if (date[0] != null) {
                        this.userInfo = date[0];

                        this.getUserJobList();
                    } else {
                        this.userInfo = null;
                        this.userJobLists = null;
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    getintentUserInfo() {
        const postData = { account: this.intentAccountId };

        this.UserJobManageService.getUofUserInfo(postData)
            .subscribe({
                next: (date) => {
                    if (date[0] != null) {
                        this.intentUserInfo = date[0];

                    } else {
                        this.intentUserInfo = null;
                    }
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    getUserJobList() {
        const postData = { account: this.accountId };

        this.UserJobManageService.getUofUserJobList(postData)
            .subscribe({
                next: (date) => {
                    this.userJobLists = date;
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    openNew() {
        if (this.selectedUserJobLists.length != 0) {
            this.targetConfirmDialog = true;

            this.copyJobAmount = this.selectedUserJobLists.length;
        }
    }

    checkCopyJob() {
        if(this.intentUserInfo == null){
            this.Messageservice.add({ key: 'logMsg', severity: 'error', summary: 'Error Message', detail: '請輸入對象工號' });

            return;
        }

        this.descriptionDialog = true;
    }

    confirmCopyJob() {
        if (this.description == null) {
            this.Messageservice.add({ key: 'logMsg', severity: 'error', summary: 'Error Message', detail: '處理紀錄不得為空' });

            return;
        }

        const postData = {
            source_user: this.accountId,
            target_user: this.intentAccountId,
            jobList: this.selectedUserJobLists,
            executive: "TW10622",
            description: this.description
        };
        
        this.UserJobManageService.copyUofJobToUser(postData)
            .subscribe({
                next: (date) => {
                    this.Messageservice.add({ key: 'logMsg', severity: 'success', summary: 'Success Message', detail: '完成' });

                    this.hideDialog();
                },
                error: (response) => {
                    console.log(response);
                }
            });
    }

    hideDialog() {
        this.intentAccountId = '';

        this.description = null;

        this.intentUserInfo = null;

        this.targetConfirmDialog = false;

        this.descriptionDialog = false;
    }
}

