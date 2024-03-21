import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/interfaces/Product';
import { Wishlist } from 'src/app/services/interfaces/Wishlist';
import { ProductService } from 'src/app/services/product.service';
import { SingleProductService } from 'src/app/services/single-product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit{
  
  public product?:Product;
  public productId:number = 0;
  public userId = parseInt(localStorage.getItem('userId') || '0');
  categoryName: string = '';
  quantity:number = 1;

  isAdmin(){
    return localStorage.getItem('role') === 'ADMIN';
  }

  constructor(private activateRoute:ActivatedRoute, private productService:ProductService,
              private service:SingleProductService, private alertify:AlertifyService,
              private cartService:CartService,
              private router:Router) {}
  
  ngOnInit(){
    this.productId = this.activateRoute.snapshot.params['id'];
    this.service.getProductDetailsById(this.productId).subscribe({
      next:(data) => {
        // console.log(this.productId);
        this.service.productId = this.productId;
        this.product = data;
        this.categoryName = data.category.name;
      },
      error: (error) => {
        this.alertify.error("Failed to fetch product");
      }
    });
  }

    itemAddToCart(productId: number) {
      if (this.product && this.userId !== 0) {
        
        this.cartService.addToCart(this.userId, productId, this.quantity).subscribe(
          (data) => {
            // console.log('Product added to cart:', data);
            this.alertify.success('Product added to cart');
            this.cartService.getCart(this.userId);
            window.location.reload();
          },
          (error) => {
            console.error('Error adding product to cart:', error);
            this.alertify.warning('Please login to shop');
          }
        );
      } else {
        console.error('User not signin.');
        this.alertify.warning('Please login to shop');
      }
    }
  

    itemAddToWishlist(productId: number) {
      if (this.userId !== 0) {
          this.cartService.addToWishlist(this.userId, productId).subscribe(
              (data:Wishlist) => {
                console.log(data)
                  this.alertify.success('Product added to wishlist');
              },
              (error) => {
                  console.error('Error adding product to wishlist:', error);
                  this.alertify.warning('Unable to add product to wishlist');
              }
          );
      } else {
          this.alertify.warning('Please login to add to wishlist');
      }
  }
  
}
