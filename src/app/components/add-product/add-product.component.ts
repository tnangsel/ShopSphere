import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryDao } from 'src/app/services/interfaces/CategoryDao';
import { Product } from 'src/app/services/interfaces/Product';
import { ProductDao } from 'src/app/services/interfaces/ProductDao';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  
  product?:Product;

  isAdmin(){
    return localStorage.getItem('role') === 'ADMIN';
  }

  
  public productId:number = 0;
  isUpdating: boolean = false;

  title: string = 'test';
  description: string = 'test';
  price: string = '';
  name: string = 'test';
  
  categoryDao: CategoryDao = {
    name: this.name
  }
  productDao: ProductDao = {
    title: this.title,
    description: this.description,
    price: this.price,
    category: this.categoryDao
  }
 
  constructor(private activatedRoute:ActivatedRoute, private productService: ProductService, private alertify:AlertifyService, private router:Router){}   
 
  ngOnInit(){
    this.productId = this.activatedRoute.snapshot.params['id'];
      if (this.productId) { 
        this.isUpdating = true;
        this.productService.getProductById(this.productId).subscribe(
            (response: ProductDao) => {
                this.productDao = response;
            },
            error => {
                this.alertify.error('Failed to fetch product data');
            }
          );
      }
  }

  addProduct(): void {
    const categoryDao: CategoryDao = {
      name: this.name
    }
    const productDao: ProductDao = {
      title: this.title,
      description: this.description,
      price: this.price,
      category:categoryDao
    }
    this.productService.addProduct(productDao)
    .subscribe(
      response => {
        // console.log(response);
        this.alertify.success('Product added successfully');
        this.router.navigate(['/products']);
      },
      error => {
        this.alertify.error('Product addition failure');
      }
    );
  }

  editProduct(): void {
    this.productService.updateProduct(this.productId, this.productDao).subscribe(
      () => {
        this.alertify.success('Product updated successful');
        this.router.navigate(['/products']);
      },
      error => {
        this.alertify.error('Failed to update product');
      }
    )
  }

  confirmDeleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(productId);
    }
  }

  deleteProduct(productId: number) {
    // console.log(productId);
    this.productService.removeProduct(productId).subscribe(
      (response: string) => {
        if (typeof response === 'string') {
          // console.log(response); 
          this.alertify.success('Product deleted successful');
          this.router.navigate(['/products']);
        } else {
          // console.error(response);
          this.alertify.error('Unexpected response from the server');
        }
      },
      error => {
        // console.log(error);
        this.alertify.error('Failed to delete product');
      }
    );
  }

}
