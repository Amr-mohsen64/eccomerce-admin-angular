import { IUser } from './../../Models/iuser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { existEmailValidator } from 'src/CustomValidators/ExistEmail.Validator';
import { passwordMatch } from 'src/CustomValidators/PasswordMatch.Validator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent implements OnInit {
  userRegForm: FormGroup;
  existUserEmails: string[] = [];

  constructor(private fb: FormBuilder) {

    //todo:call api to  filter exist email
    this.existUserEmails = ["aa@aa.com", "bb@bb.com", "cc@cc.com", "cc@cc.com"]

    //its group of controls 
    this.userRegForm = fb.group({
      fullName: ['', [Validators.required, Validators.pattern("[A-Z-a-z]{5,}")]],
      email: ['', [Validators.email, Validators.required, existEmailValidator(this.existUserEmails)]],
      phoneNo: fb.array([this.fb.control('', Validators.required)]),
      address: fb.group({
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      referral: [''],
      referralOther: ['']
    },{validators:passwordMatch})
  }

  get fullName() {
    return this.userRegForm.get("fullName")
  }

  get email() {
    return this.userRegForm.get("email")
  }

  get phoneNumbers() {
    return this.userRegForm.get("phoneNo") as FormArray
  }

  get address() {
    return this.userRegForm.get("address")
  }

  get city() {
    return this.userRegForm.get("address.city")
  }

  get postalCode() {
    return this.userRegForm.get("address.postalCode")
  }

  get street() {
    return this.userRegForm.get("address.street")
  }

  get password() {
    return this.userRegForm.get("password")
  }

  get confirmPassword() {
    return this.userRegForm.get("confirmPassword")
  }

  get referralOther() {
    return this.userRegForm.get("referralOther")
  }

  get referral() {
    return this.userRegForm.get("referral")
  }

  addPhoneNumber(event: any) {
    this.phoneNumbers.push(this.fb.control(''))
    // event.target.style.display="none"
  }

  //remove phone
  removePhone(input: number) {
    this.phoneNumbers.removeAt(input)
  }


  //conditinal validator
  updateReferalValidators() {
    if (this.referral?.value == "other") {
      this.userRegForm.get("referralOther")?.addValidators([Validators.required])
    } else {
      this.userRegForm.get("referralOther")?.clearValidators()
    }
    this.userRegForm.get("referralOther")?.updateValueAndValidity()
  }



  submit() {
    let userModel: IUser = this.userRegForm.value as IUser;
    console.log(userModel);
  }


  ngOnInit(): void {

  }


  // fillForm(){
  //   //or setvalue
  //   this.userRegForm.patchValue({
  //     fullName:'ITI',
  //     email:"amrmohsen72@#gmailc.om",
  //     address:{
  //       city:"cairp",
  //       postalCode:144,
  //       street:"16 area"
  //     }
  //   })
  // }
}
