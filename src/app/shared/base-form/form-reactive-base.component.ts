import {OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

declare var $: any;

export abstract class FormReactiveBaseComponent implements OnInit {

    form: FormGroup;

    protected constructor() {
    }

    ngOnInit() {
    }

    abstract submit();

    onSubmit() {

        if (this.form.valid) {
            this.submit();
        } else {
            this.markAllFormFieldsAsTouched(this.form);


            // go element with error
            setTimeout(() => {
                const diff = 200;

                $('html, body').animate({
                    scrollTop: ($('.is-invalid').first().offset().top - diff)
                }, 500);
            });

            console.log(this.form.controls);


            /*   setTimeout(() => {
                   let scroll = jQuery('#mat-sidenav-content--inner');
                   if (scroll.length > 0) {
                       scroll.scrollTo(jQuery('.ng-invalid:not(form):first'), {
                           duration: 700,
                           offset: {top: -50}
                       });
                   }
               });*/

        }
    }


    markAllFormFieldsAsTouched(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsDirty();
            control.markAsTouched();
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.markAllFormFieldsAsTouched(control);
            }
        });
    }

    reset() {
        this.form.reset();
    }

    hasError(field: string) {
        return this.form.get(field).errors;
    }

    isValid(name: string): object {
        const el = this.form.get(name);
        return {
            'is-invalid': (!el.valid && (el.touched || el.dirty) && el.status === 'INVALID')
        };
    }

    isValidFormControl(el: FormControl): object {
        return {
            'is-invalid': (!el.valid && (el.touched || el.dirty) && el.status === 'INVALID')
        };
    }

    hasErrorWithValidator(name: string, validatorName: string): boolean {
        const el = this.form.get(name);
        return (el.invalid && (el.touched || el.dirty)) && el.hasError(validatorName);
    }

    hasErrorWithValidatorFormControl(el: FormControl, validatorName: string): boolean {
        return (el.invalid && (el.touched || el.dirty)) && el.hasError(validatorName);
    }

    isValidFormArray(formArrayName: string, index: number, fieldName: string): object {
        const el = this.getFieldOfFormArray(formArrayName, index, fieldName);
        return {
            'is-invalid': (!el.valid && (el.touched || el.dirty) && el.status === 'INVALID')
        };
    }

    getFieldOfFormArray(formArrayName: string, index: number, fieldName: string): AbstractControl {
        const telephones = this.form.get(formArrayName) as FormArray;
        const formGroup = telephones.controls[index] as FormGroup;
        return formGroup.controls[fieldName];
    }

    getFormArray(formArrayName: string): FormArray {
        return this.form.get(formArrayName) as FormArray;
    }

    print(o) {
        console.log(o);
    }
}

