import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserDao } from 'src/app/services/interfaces/UserDao';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  private id:number = 0;
    user:any = [];

    firstName:string ='';
    lastName:string= '';
    email:string ='';
    pass:string = '';
    city:string = '';
    street:string = '';
    zipcode:string = '';
    phone:string = '';
    roles:string = '';

   namedao={
    firstName: this.firstName,
    lastName: this.lastName
  };
  addressdao={
    city:this.city,
    street:this.street,
    zipcode:this.zipcode,
    phone:this.phone
  };

  userdao:UserDao = {
    name: this.namedao,
    email: this.email,
    pass: this.pass,
    address: this.addressdao,
    roles: this.roles
  };


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router:Router,
    private alertify:AlertifyService){}
  
  ngOnInit(){

    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(
      (response: UserDao) => {
        //  console.log('User : ' + response.email);
          this.userdao = response;
      },
      error => {
        this.alertify.error('Failed to fetch user data');
      }
    );
  }

  editUser() {
    this.userService.updateUser(this.id, this.userdao).subscribe(
      () => {
        this.alertify.success('User updated successful');
        this.router.navigate(['/admin/users']);
      },
      error => {
        this.alertify.error('Failed to update user');
      }
    );
  }

}