import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/services/interfaces/Cart';
import { CartDao } from 'src/app/services/interfaces/CartDao';
import { CartDetails } from 'src/app/services/interfaces/CartDetails';
import { CategoryDao } from 'src/app/services/interfaces/CategoryDao';
import { OrderDetailsResponse } from 'src/app/services/interfaces/OrderDetailsResponse';
import { Product } from 'src/app/services/interfaces/Product';
import { ProductDao } from 'src/app/services/interfaces/ProductDao';
import { SingleProductService } from 'src/app/services/single-product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  shippingPrice:number = 17;
  discountPrice:number = 0;
  discountCode:string = '';
  subTotal:number = 0;
  totalPrice:number = 0;
  product:Product[] = [];
  cartDetails:CartDetails[] = [];
  cartItems:Cart[] = [];
  cartDao:CartDao[] = [];
  numItems: number = 0;
  userId: number = parseInt(localStorage.getItem('userId') || '0');
  productId: number = 0;
  singleProduct: Product | null = null;
  quantity:number = 1;
  
  constructor(private cartService: CartService, private singleProdService:SingleProductService,
             private router:Router, private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadSingleProductDetails(productId:number): void{
    this.singleProdService.getProductDetailsById(productId).subscribe(
      (data: Product) => {
        this.product.push(data);
        this.subTotal += data.price * this.quantity;
        this.totalPrice = this.subTotal + this.shippingPrice - this.discountPrice;
      }
  );
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe(
      (data: Cart[]) => {
        this.cartItems = data;
        for(let p of this.cartItems){
          this.productId = p.product_id;

        }
        this.numItems = this.cartItems.length - 1;
        for(let i of this.cartItems){
          this.loadSingleProductDetails(i.product_id);
        }
        
      },
      (error) => {
        this.alertify.error('Failed to fetch Cart');
      }
    );
  }

  applyDiscount() {
    this.cartService.getDiscount(this.discountCode).subscribe(
      (data:number ) => {
        // console.log(data);
        this.discountPrice = data;
        this.totalPrice = this.subTotal + this.shippingPrice - this.discountPrice;

      }
    )
  }
  
  removeFromCart(productId: number) {
    const token = 'token';
    this.cartService.removeFromCart(this.userId, this.productId).subscribe(
      (data: string) => {
        this.loadCart();
        this.alertify.success('Product removed from cart.');
        window.location.reload;
      }
    );
  }

  
  increaseQuantity() {
    this.quantity++;
    this.subTotal = this.product.reduce((acc, curr) => acc + curr.price * this.quantity, 0);
    this.totalPrice = this.subTotal + this.shippingPrice - this.discountPrice;
  }

  decreaseQuantity() {
      if (this.quantity > 1) { 
          this.quantity--;
          this.subTotal = this.product.reduce((acc, curr) => acc + curr.price * this.quantity, 0);
          this.totalPrice = this.subTotal + this.shippingPrice - this.discountPrice;
      }
  }

  updateQuantity(productId: number) {
    const cartDao: CartDao[] = [{
        product_id: productId,
        user_id: this.userId,
        quantity: this.quantity
    }];

    this.cartService.updateProductQantity(this.userId, cartDao).subscribe(
        (data: CartDao[]) => {
            this.loadCart();
            this.alertify.success('Quantity updated successfully.');
        },
        (error) => {
            this.alertify.error('Failed to update quantity');
        }
    );
  }

  placeOrder() {
    let productDaoList:ProductDao[] = [];
    for(let prod of this.product){
      let categoryDao:CategoryDao = {
        name:prod.category.name
      }
      let productDao:ProductDao = {
        title: prod.title,
        description: prod.description,
        category: categoryDao,
        price:prod.price.toString()
      }
      productDaoList.push(productDao);
    }

    this.cartService.placeOrder(productDaoList).subscribe(
      (data:OrderDetailsResponse) => {
        // console.log(data);
        this.alertify.success('Order placed success.');
        this.router.navigate(['/orders']);
      },
      (error) => {
        this.alertify.error('Failed to order product.');
      }
    )
  }

}
