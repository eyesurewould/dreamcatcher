import { ValidatorFn, AbstractControl } from '@angular/forms';

/** Check for a valid email (can't use Angular default - too lax) */
export function emailValidator(emailRegEx: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        console.log('emailValidator: start ', control);
        return ( control.value === '' || emailRegEx.test(control.value) ) ? null : { 'invalidEmail': true };
    };

}


/** Check for a valid US phone */
export function phoneValidator(phoneRegEx: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        console.log('phoneValidator: start ', control);
        //console.log('phoneValidator:  phoneRegEx.test() ', phoneRegEx.test(control.value));
        return ( control.value == '' || phoneRegEx.test(control.value) ) ? null : { 'invalidPhone': true };
    };

}
