import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {EventEmitterService} from '@core/service/event-emitter.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthenticationService} from '@core/service/rest/authentication.service';
import {UserValidators} from '@core/validator/user.validator';
import {AuthGuard} from '@core/guard/auth.guard';
import {RoleGuard} from '@core/guard/role.guard';

// AoT requires an exported function for factories, for use with the TranslateModule
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [],
    providers: [
        EventEmitterService,

        // Services http
        AuthenticationService,

        // Validators async
        UserValidators,

        // Guards
        AuthGuard,
        RoleGuard

    ],
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('You shall not run! :(');
        }
    }
}
