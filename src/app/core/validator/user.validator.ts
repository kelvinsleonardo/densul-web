import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserValidators {
   /* constructor(private usersService: UsersService) {}*/

/*    searchUser(text) {
        // debounce
        return timer(1000)
            .pipe(
                switchMap(() => {
                    return this.usersService.validateField(text);
                })
            );
    }

    check(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this.searchUser(control.value)
                .pipe(
                    tap(console.log),
                    map(res => {
                        if (res.length) {
                            return { 'userNameExists': true};
                        }
                    })
                );
        };

    }*/

}
