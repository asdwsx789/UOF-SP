import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserJobManageComponent } from './user-job-manage.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UserJobManageComponent }
    ])],
    exports: [RouterModule]
})
export class UserJobManageRoutingModule { }
