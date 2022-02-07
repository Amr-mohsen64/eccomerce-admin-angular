import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
//cross field custom validation
export const passwordMatch: ValidatorFn =
    (frmGroup: AbstractControl): ValidationErrors | null => {
        let passControl = frmGroup.get('password');
        let confirmPassControl = frmGroup.get('confirmPassword');
        if (!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value)
            return null;

        let valErr = { 'UnmatchedPassword': { 'pass': passControl?.value, 'confrim': confirmPassControl?.value } }
        return (passControl?.value == confirmPassControl?.value) ? null : valErr;
    }