import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDao } from '../../services/interfaces/UserDao';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  
  
  // firstName: string = '';
  // lastName: string = '';
  // email: string = '';
  // pass: string = '';
  // city: string = '';
  // street: string = '';
  // zipcode: string = '';
  // phone: string = '';
  // roles: string = '';

  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder service
    private registerService: RegisterService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
    // Initialize the registration form with form controls and validation rules
    registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      phone: ['', Validators.required],
      roles: ['', Validators.required]
    });
  
  // Method to check if a form control has errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName) as FormControl;
    return control?.hasError(errorType) && (control.dirty || control.touched);
  }

  // Method to check if any form control has errors
  anyError(): boolean {
    return (
      this.hasError('firstName', 'required') ||
      this.hasError('email', 'email') ||
      this.hasError('pass', 'required')
    );
  }

  // Method to handle form submission
  onRegister(): void {
    if (this.registerForm.valid) {
      const userdao: UserDao = {
        name: {
          firstName: this.registerForm.value.firstName as string,
          lastName: this.registerForm.value.lastName as string
        },
        email: this.registerForm.value.email as string,
        pass: this.registerForm.value.pass as string,
        address: {
          city: this.registerForm.value.city as string,
          street: this.registerForm.value.street as string,
          zipcode: this.registerForm.value.zipcode as string,
          phone: this.registerForm.value.phone as string
        },
        roles: this.registerForm.value.roles as string
      };
  
      this.registerService.registerUser(userdao)
        .subscribe(
          response => {
            this.alertify.success('User registered successfully');
            this.router.navigate(['/login']);
          },
          error => {
            this.alertify.error('Registration failure');
          }
        );
    }
  }

}


