import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class RouteService {

    constructor(private router: Router) {
    }

    go(routes: string[], pathVariables: object = {}, queryParams?: object, config?: ConfigRoute) {

        // Get to string
        let path: string = routes.join('/');

        // Replace paths variable
        Object.keys(pathVariables).forEach(key => {
            path = path.replace(':'.concat(key), pathVariables[key]);
        });

        //  console.log("path: "+ path);
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([path], {queryParams: queryParams});

    }

    goByUrl(url: string) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl(url);
    }

    reload() {
        location.reload();
    }

    clearQueryParams(qp = {}) {
        this.router.navigate([], {queryParams: {...qp}, queryParamsHandling: 'merge'});

    }
}

export interface ConfigRoute {
    keepParam?: boolean;
}
