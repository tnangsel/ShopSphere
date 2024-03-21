import { Component } from '@angular/core';
import { Cart } from 'src/app/services/interfaces/Cart';
import { Product } from 'src/app/services/interfaces/Product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  // public product?:Product;
  public productId:number = 0;
  public userId = parseInt(localStorage.getItem('userId') || '0');
  categoryName: string = '';

  product:Product[] = [];
  // cartDetails:CartDetails[] = [];
  cartItems:Cart[] = [];
removeFromCart(arg0: any) {

}
}
