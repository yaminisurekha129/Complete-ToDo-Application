import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'apngp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm!: FormGroup;
  submitted = false;
  newEmail: string = '';
  newPassword: string = '';
  public items: { id: any, email: string, password: string }[] = [];

  constructor(private fb: FormBuilder, private signupService: SignupService) {}

  ngOnInit(): void {
    this.signForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to match password and confirm password fields
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  get formControls() {
    return this.signForm.controls;
  }

  // Function to handle form submission
  call() {
    this.submitted = true;
    if (this.signForm.valid) {
      console.log(this.signForm.value);
      this.signupService.signup(this.signForm.value).subscribe(
        response => {
          console.log('Signup successful:', response);
          this.signForm.reset(); // Reset the form after successful signup
        },
        error => {
          console.error('Signup failed:', error);
        }
      );
    }
  }

  // Function to handle inserting data
  signup() {
    if (this.newEmail.trim() !== '' && this.newPassword.trim() !== '') {
      this.signupService.signup({ email: this.newEmail, password: this.newPassword }).subscribe(() => {
        this.newEmail = '';
        this.newPassword = '';
      });
    }
  }
}
