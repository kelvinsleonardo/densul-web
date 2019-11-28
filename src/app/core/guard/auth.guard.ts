import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {WebStorageService} from '@core/service/webstorage.service';
import {Constant} from '@core/config/constant.config';
import {RouteService} from '@core/service/route.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private wStorage: WebStorageService,
                private routeService: RouteService) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {


        if (this.wStorage.isAuthenticated()) {
            return true;
        }

        this.routeService.go([Constant.routes.login]);
        this.wStorage.clear();

        return false;
    }
}
