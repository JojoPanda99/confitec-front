import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {SharedModule} from "../shared/shared.module";

import {CreateUserComponent} from "./user/create-user/create-user.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {BaseUserRouteComponent} from "./user/component/base-user-route/base-user-route.component";
import {UserFormComponent} from "./user/component/user-form/user-form.component";
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

const USER_COMPONENTS = [CreateUserComponent, ListUserComponent, BaseUserRouteComponent, UserFormComponent]

@NgModule({
    declarations: [USER_COMPONENTS, UpdateUserComponent, ViewUserComponent],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedModule,
    ],
})
export class PublicModule {
}
