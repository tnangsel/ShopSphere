import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { User } from 'src/app/services/interfaces/User';
import { LogoutService } from 'src/app/services/logout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  users: User[] = [];
  
  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(private logoutService: LogoutService, private userService: UserService,
    private activatedRoute: ActivatedRoute, private router:Router,
    private alertify:AlertifyService){}

  onLogout(event: Event) {
    event.preventDefault();
    localStorage.removeItem('token');
    this.logoutService.logout();
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        // console.log(data);
        this.users = data;
        },
        (error: any) => {
          this.alertify.error('Fetching user list failure');
        }
      );
  }

  confirmDeleteUser(userId:number){
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteUser(userId);
    }
  }

  deleteUser(userId: number){
    this.userService.deleteUser(userId).subscribe(
      (response: string) => {
        if (typeof response === 'string') {
          // console.log(response); 
          this.alertify.success(response);
          this.getAllUsers();
        } else {
          // console.error('Unexpected response:', response);
          this.alertify.error('Unexpected response from the server');
        }
        this.getAllUsers(); 
        // this.router.navigate(['/admin/users']);
      },
      error => {
        this.alertify.error('Failed to delete user');
      }
      );
  }

}
