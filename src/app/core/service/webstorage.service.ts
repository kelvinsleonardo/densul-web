import {Injectable} from '@angular/core';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {JwtHelper} from '@core/common/jwt-helper.common';

@Injectable()
export class WebStorageService {

  @LocalStorage('uml')
  public _userMail: string;
  @LocalStorage('uid')
  private _userId: number;
  @LocalStorage('uname')
  private _userName: string;
  @LocalStorage('auth')
  private _authorization: string;
  @LocalStorage('urol')
  private _userRoles: string[];

  constructor(private ls: LocalStorageService) {
  }

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get userMail(): string {
    return this._userMail;
  }

  set userMail(userMail: string) {
    this._userMail = userMail;
  }

  get userAuthorization(): string {
    return this._authorization;
  }

  set userAuthorization(authorization: string) {
    this._authorization = authorization;
  }


  get userRoles(): string[] {
    return this._userRoles;
  }

  set userRoles(userRoles: string[]) {
    this._userRoles = userRoles;
  }

  clear() {
    this.ls.clear();

  }

  isAuthenticated() {
    return !!this.userAuthorization && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return JwtHelper.isTokenExpired(this.userAuthorization);
  }

  hasPermission(roles: string[]): boolean {
    if (!this.userRoles) {
      return false;
    }
    return roles.some(role => this.userRoles.includes(role));
  }
}
