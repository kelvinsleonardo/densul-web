import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {IResponse} from '@core/model/iresponse.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly API = `${environment.API}`;

    constructor(protected http: HttpClient) {
    }

    login(auth: any) {
        return this.http.post<IResponse>(`${this.API}/login`, auth).pipe(take(1));
    }

    requestNewPassword(mail: any) {
        const params = new HttpParams().set('mail', String(mail));
        return this.http.get<IResponse>(`${this.API}/p/users/request-new-password`, {params: params}).pipe(take(1));
    }

    redefinePassword(key: any, newPassword: string) {
        const params = new HttpParams().set('password', String(newPassword));
        return this.http.get<IResponse>(`${this.API}/p/users/new-password/${key}`, {params: params}).pipe(take(1));
    }

    unlockUser(key: any) {
        return this.http.get<IResponse>(`${this.API}/p/users/unlock/${key}`).pipe(take(1));
    }


}
