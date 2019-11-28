import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {throwError as observableThrowError} from 'rxjs/index';
import {tap} from 'rxjs/internal/operators';
import {finalize} from 'rxjs/operators';
import {WebStorageService} from '@core/service/webstorage.service';
import {RouteService} from '@core/service/route.service';
import {HTTPStatus} from '@core/model/http-status.model';
import {Constant} from '@core/config/constant.config';

@Injectable()
export class HttpInterceptService implements HttpInterceptor {

    constructor(private wStorage: WebStorageService,
                private routeService: RouteService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler,
    ): Observable<HttpEvent<any>> {


        const reqModified = request.clone({
            setHeaders: {
                ...!(request.headers.has('Authorization')) && {'Authorization': !!this.wStorage.userAuthorization ? this.wStorage.userAuthorization : ''},
                ...!(request.body instanceof FormData) && {'Content-Type': 'application/json;charset=utf-8'}
            }
        });


        return next.handle(reqModified)
            .pipe(
                tap((event: HttpEvent<any>) => {

                    if (event instanceof HttpResponse) {
                    }

                }, responseError => {

                    if (responseError instanceof HttpErrorResponse) {

                        switch (responseError.status) {
                            case HTTPStatus.INTERNAL_SERVER_ERROR:
                                this.routeService.go([Constant.routes['500']]);
                                break;

                            default:
                                break;
                        }


                        return observableThrowError(responseError);
                    }

                })
            ).pipe(finalize(() => {

            }));
    }
}
