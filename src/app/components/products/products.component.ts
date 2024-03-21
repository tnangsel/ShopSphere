import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Product } from 'src/app/services/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

  productList:Product[] = [];
  
  constructor(private pService:ProductService, 
              private alertify:AlertifyService, 
              private router:Router){}

  isAdmin: boolean = false;

  ngOnInit() {
    this.checkAdminStatus();
    this.loadProducts();
  }

  loadProducts(){
    this.pService.getAllProducts().subscribe(
      {
        next:(data: Product[]) => {
          this.productList = data;
        },
        error:(error: any) => {
          this.alertify.error('Failed to fetch product list');
        }
      }
    );
  }

  checkAdminStatus() {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  fetchCategory(categoryName: string) {
    this.pService.getProductsByCategory(categoryName).subscribe(
      response => {
        this.productList = response;
        this.pService.getAllProducts();
      },
      error => {
        this.alertify.error('Category does not exist');
      }
    )
  }




  // deleteProduct(pId: number): void {
  //   this.pService.removeProduct(pId).subscribe(
  //     () => {
  //     this.pService.getAllProducts(); 
  //     this.alertify.success('User deleted successfully');
  //     this.router.navigate(['/products']);
  //   });
  // }

}
