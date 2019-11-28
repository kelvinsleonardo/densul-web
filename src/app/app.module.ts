import {BrowserModule, Title} from '@angular/platform-browser';
import {ErrorHandler, Injector, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {CoreModule} from '@core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptService} from '@core/interceptor/interceptor-http.service';
import {ErrorsHandler} from '@core/interceptor/errors-handler';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HomePageComponent} from '@pages/home/home';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxWebstorageModule.forRoot({
      prefix: 'densul',
    }),
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private injector: Injector) {

    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const title = 'Densul | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });

  }
}
