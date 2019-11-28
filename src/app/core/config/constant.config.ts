import {environment} from '@env/environment';


export class Constant {

  static API = `${environment.API}`;

  static routes = {
    empty: '',
    root: 'home',
    user: {
      root: 'user',
      register: 'register',
      edit: 'edit',
      editAnother: ':userId/edit',
      list: 'list'
    },
    login: 'login',
    requestPassword: 'request-password',
    definePassword: 'define-new-password',
    unlock: 'unlock',
    '500': '500',
    '404': '404'
  };
}
