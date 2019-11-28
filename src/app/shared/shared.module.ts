import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [],
  exports: [
    // Modules Core
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule {
}
