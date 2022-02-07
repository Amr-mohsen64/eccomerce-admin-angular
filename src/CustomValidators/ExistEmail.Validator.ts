import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//sync valdiator funct
export function existEmailValidator(existEmails: string[]): ValidatorFn {
    //must take type of abstract control
    return (control: AbstractControl): ValidationErrors | null => {
        let emailVal: string = control.value
        let validationErrors = { 'existEmail': { 'myvalue': emailVal } }
        if (emailVal.length == 0 && control.touched) return null;
        console.log(existEmails);

        let foundEmail = existEmails.includes(emailVal)
        return foundEmail ? validationErrors : null
    }
}