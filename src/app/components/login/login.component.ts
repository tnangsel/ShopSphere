import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
// import * as alterfy from 'alertifyjs';
import { UserCredientials } from 'src/app/services/interfaces/UserCrediential';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService,
              private alertify:AlertifyService, 
              private router:Router){}

  onLogin(){
  
    const  userCred: UserCredientials = {
      username:this.username,
      password:this.password
    }

    // Get the user ID by username 
    this.loginService.getUserId(userCred.username).subscribe(
      userId => {
        localStorage.setItem('userEmail', this.username);
        localStorage.setItem('userId', JSON.stringify(userId));
      },
      error => {
        this.alertify.error('User Id is null');
      });

    this.loginService.loginUser(userCred).subscribe(
        response => {
          if (response.role === 'ADMIN') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', 'ADMIN');
            localStorage.setItem('validToken', 'true');
    
            this.alertify.success('Admin login successful');
            this.router.navigate(['/admin']);
    
          } else {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', 'USER');
            localStorage.setItem('validToken', 'true');
    
            this.alertify.success('User login successful');
            this.router.navigate(['/home']);
            
          }
        },
        error => {
          this.alertify.error('Please enter valid login info');
        }
    );

  }
}