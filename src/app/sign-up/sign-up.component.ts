import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmedPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;

  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    confirmedPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  }, { validators: passwordsMatchValidator() }
  )
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmedPassword() {
    return this.signupForm.get('confirmedPassword');
  }

  submit() {
    if (!this.signupForm.valid) {
      return;
    }

    const { name, email, password } = this.signupForm.value;
    this.auth.signUp(name!, email!, password!).subscribe(() => {
      this.router.navigate(['/board'])
    })
  }

}
