import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDao } from '../../services/interfaces/UserDao';

import { AlertifyService } from 'src/app/services/alertify.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    firstName:string ='';
    lastName:string= '';
    email:string ='';
    pass:string = '';
    city:string = '';
    street:string = '';
    zipcode:string = '';
    phone:string = '';
    roles:string = '';

    constructor(private registerService: RegisterService, private alertify:AlertifyService, private router:Router) {}

    onRegister(): void {

      const namedao={
        firstName: this.firstName,
        lastName: this.lastName
      };
      const addressdao={
        city:this.city,
        street:this.street,
        zipcode:this.zipcode,
        phone:this.phone
      };
  
      const userdao:UserDao = {
        name: namedao,
        email: this.email,
        pass: this.pass,
        address: addressdao,
        roles: this.roles
      };

      // console.log(userdao);

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
