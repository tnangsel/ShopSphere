import { Component, Input } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/interfaces/Product';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent {
  
  @Input()
  products?:Product;

  
  cart: Product[] = [];
  
  constructor(private cartService: CartService, private alertity:AlertifyService){}

  ngOnit(){
   
  }
}
