import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiscountComponent } from './components/discount/discount.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'products',
    component:ProductsComponent
  },
  {
    path: 'products/:id',
    component:SingleProductComponent
  },
  {
    path: 'cart/:id',
    component:CartComponent
  },
  {
    path: 'orders',
    component:OrderHistoryComponent
  },
  {
    path: 'wishlist',
    component:WishlistComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin',
        component:DashboardComponent
      },
      {
        path: 'admin/products',
        component:AddProductComponent
      },
      {
        path: 'admin/products/:id',
        component:AddProductComponent
      },
      {
        path: 'admin/users',
        component:UserComponent
      },
      {
        path: 'admin/users/update/:id',
        component:UserEditComponent
      }, 
      {
        path: 'admin/discounts',
        component:DiscountComponent
      }
    ]
  },
  {
    path: '',
    component: UserComponent,
    children: [
      
      
    ]
  },
  
  {
    path: '',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
