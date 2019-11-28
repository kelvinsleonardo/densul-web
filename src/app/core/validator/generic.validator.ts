import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

export class GenericValidator {
    constructor() {
    }

    /**
     * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
     */
    static cpf(control: AbstractControl): { [key: string]: any } {

        const cpf = control.value;
        if (cpf) {
            let numbers, digits, sum, i, result, equalDigits;
            equalDigits = 1;
            if (cpf.length < 11) {
                return {cpfInvalid: true};
            }

            for (i = 0; i < cpf.length - 1; i++) {
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                    equalDigits = 0;
                    break;
                }
            }

            if (!equalDigits) {
                numbers = cpf.substring(0, 9);
                digits = cpf.substring(9);
                sum = 0;
                for (i = 10; i > 1; i--) {
                    sum += numbers.charAt(10 - i) * i;
                }

                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                if (result !== Number(digits.charAt(0))) {
                    return {cpfInvalid: true};
                }
                numbers = cpf.substring(0, 10);
                sum = 0;

                for (i = 11; i > 1; i--) {
                    sum += numbers.charAt(11 - i) * i;
                }
                result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                if (result !== Number(digits.charAt(1))) {
                    return {cpfInvalid: true};
                }
                return null;
            } else {
                return {cpfInvalid: true};
            }
        }
        return null;
    }

    static number(control: AbstractControl): { [key: string]: any } {

        if (control.value && !/^\d+$/.test(control.value)) {
            return {numberInvalid: true};
        }

        return null;

    }

    static numberIntegerGreaterThanZero(control: AbstractControl): { [key: string]: any } {

        if (control.value === 0 || (control.value && !/^[1-9]\d*$/.test(control.value))) {
            return {numberInvalid: true};
        }

        return null;

    }

    static equalsTo(otherField: string): { [key: string]: any } {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('This necessary declare one field');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('Please, declare a field valid.');
            }
            if (field.value !== formControl.value) {
                return {equalsTo: otherField};
            }

            return null;
        };
        return validator;
    }

}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
