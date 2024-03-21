import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { SingleProductService } from 'src/app/services/single-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  isAdmin: boolean = false;
  
  @Input() product?:Product;
 
  productId:number = 0;
  public userId = parseInt(localStorage.getItem('userId') || '0');

  constructor(private activateRoute:ActivatedRoute,private productService:ProductService, 
    private alertify:AlertifyService,private router:Router,
    private cartService:CartService, private singleProService:SingleProductService){}

  ngOnInit() {
    this.checkAdminStatus();
    
  }

  checkAdminStatus() {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  // deleteProduct(productId: number) {
  //     this.productService.removeProduct(productId).subscribe(
  //       (response: string) => {
  //         if (typeof response === 'string') {
  //           console.log(response); 
  //           this.alertify.success('Product deleted successful');
            
  //         } else {
  //           // console.error('Unexpected response:', response);
  //           this.alertify.error('Unexpected response from the server');
  //         }
  //         this.productService.getAllProducts();
         
  //       },
  //       error => {
  //         this.alertify.error('Failed to delete product');
  //       }
  //       );
  // }
  
  itemAddToCart(productId: number) {
    if (this.product && this.userId !== 0) {
      
      this.cartService.addToCart(this.userId, productId, 1).subscribe(
        (data) => {
          console.log('Product added to cart:', data);
          this.alertify.success('Product added to cart');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          this.alertify.error('Failed to add product to cart');
        }
      );
    } else {
      console.error('Token is missing.');
      this.alertify.warning('Please login to shop');
    }
  }
}
