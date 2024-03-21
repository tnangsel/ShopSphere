import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/services/interfaces/Cart';
import { Product } from 'src/app/services/interfaces/Product';
import { SingleProductService } from 'src/app/services/single-product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  
  public productId:number = 0;
  public userId = parseInt(localStorage.getItem('userId') || '0');
  categoryName: string = '';

  product:Product[] = [];
  cartItems:Cart[] = [];

  constructor(private cartService:CartService, private singleProdService:SingleProductService, private alertify:AlertifyService, private router:Router){}
  ogOnIt(){
    this.getWishlist();
  }

  getWishlist() {
    this.cartService.getCart(this.userId).subscribe(
      (data: Cart[]) => {
        this.cartItems = data;
        for(let p of this.cartItems){
          this.productId = p.product_id;

        }
        for(let i of this.cartItems){
          this.loadSingleProductDetails(i.product_id);
        }
      },
      (error) => {
        this.alertify.error('Failed to fetch Cart');
      }
    );
  }

  loadSingleProductDetails(productId:number): void{
    this.singleProdService.getProductDetailsById(productId).subscribe(
      (data: Product) => {
        this.product.push(data);
      }
  );
  }

  removeFromCart(arg0: any) {

  }
}
