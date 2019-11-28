import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {UserRoutingModule} from './user.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  exports: [],
  bootstrap: [],
  providers: [],
  entryComponents: []
})
export class UserModule {
  constructor() {
  }
}
