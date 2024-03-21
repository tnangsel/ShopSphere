import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DiscountService } from 'src/app/services/discount.service';
import { Discount } from 'src/app/services/interfaces/Discount';
import { DiscountDao } from 'src/app/services/interfaces/DiscountDao';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit{
  
  discounts: Discount[] = [];

  id:number = 0;
  discountPrice: number = 0;
  discountCode: string = '';
  
  discount: Discount = {
    id:this.id,
    discountPrice:this.discountPrice,
    discountCode:this.discountCode
  };

  constructor(private router:Router, private discountService:DiscountService, private alertify:AlertifyService){}
  ngOnInit(): void {
    this.getAllDiscount();
  }

  getAllDiscount(){
    this.discountService.fetchAllDiscount().subscribe(
      (data:Discount[]) => {
        this.discounts = data;
        this.router.navigate(['/admin/discounts']);
      },
      (error:any) => {
        console.log(error)
        this.alertify.error('Failed to fetch discounts');
      }
    );
  }

  createDiscount() {
    const discountDao:DiscountDao = {
      discountPrice: this.discountPrice,
      discountCode: this.discountCode
    }
    this.discountService.generateDiscount(discountDao).subscribe(
        (response:DiscountDao) => {
          console.log(response);
          this.alertify.success('Dicountcode generated successful');
          this.getAllDiscount();
          // this.router.navigate(['/admin/discounts']);
        },
        (error) => {
          this.alertify.error('Failed to create discountcode');
        }
    );
  }

  confirmDeleteDiscount(discountId: number) {
    if (confirm('Are you sure you want to delete this Discount?')) {
      this.deleteDiscount(discountId);
    }
  }

  deleteDiscount(discountId:number){
    this.discountService.removeDiscount(discountId).subscribe(
      response => {
        this.alertify.success('Discount deleted')
        this.getAllDiscount();
      },
      error => {
        this.alertify.error('Failed to delete');
      }
    );
  }




}
