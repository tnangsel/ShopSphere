import { Component } from '@angular/core';
import { OrderDetailsResponse } from 'src/app/services/interfaces/OrderDetailsResponse';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  
  userEmail = localStorage.getItem('userEmail');
  orderDetails:OrderDetailsResponse[] = []
  
  constructor(private orderService:OrderService) {
    orderService.fetchOrderHistory(this.userEmail).subscribe(
      (data:OrderDetailsResponse[]) => {
        // console.log(data);
        this.orderDetails = data;
      }
    )
  }


}
