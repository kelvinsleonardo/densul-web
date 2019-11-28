import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Constant} from '@core/config';
import {RouteService, WebStorageService} from '@core/service';

@Injectable()
export class RoleGuard implements CanActivate {


    constructor(private webStorageService: WebStorageService,
                private routerService: RouteService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const roles = this.webStorageService.userRoles;

        if (next.data.roles) {
            if (next.data.roles instanceof Array && next.data.roles.length > 0) {
                if (roles instanceof Array) {
                    if (!next.data.roles.some((role => roles.includes(role)))) {
                        console.warn('You have not permission to access this route.');
                        this.routerService.go([Constant.routes.root]);
                        return false;
                    }
                }
            }
        }

        return true;
    }

}
