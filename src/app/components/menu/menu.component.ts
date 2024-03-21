import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/services/interfaces/Cart';
import { LogoutService } from 'src/app/services/logout.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  
  cartItems: Cart[] = [];
  numItems: number = 1;
  userId = parseInt(localStorage.getItem('userId') || '0');
 
  // products:Product[] = [];


  constructor(private logoutService: LogoutService, private cartService:CartService, 
    private alertify:AlertifyService, private router:Router, private productService:ProductService){}
  
  ngOnInit(): void {
    if(this.loggedIn()){
      this.loadCart();
    }
    
  }

  loadCart(){
    this.cartService.getCart(this.userId).subscribe(
      (data: Cart[]) => {
        this.cartItems = data;
        // console.log(this.cartItems);
        this.numItems = this.cartItems.length;
      }
    );
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.logoutService.logout();
  }

  loggedIn(){
    return localStorage.getItem('token');
  }
 
  isAdmin(){
    return localStorage.getItem('role') === 'ADMIN';
  }

  isUser(){
    return localStorage.getItem('role') === 'USER';
  }

  viewCart() {
    this.cartService.getCart(this.userId).subscribe(
      (data: Cart[]) => {
        // console.log(this.userId);
        this.cartItems = data;
        this.numItems = this.cartItems.length;
        this.router.navigate(['/cart/'+this.userId]);
      },
      (error) => {
        this.alertify.warning('Please login to shop');
      }
    );
  }

}