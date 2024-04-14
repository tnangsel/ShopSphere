
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiscountComponent } from './components/discount/discount.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HighlightDirective } from './highlight.directive';
import { LoginService } from './services/login.service';
import { LogoutService } from './services/logout.service';
import { RegisterService } from './services/register.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    FooterComponent,
    ProductDetailsComponent,
    DashboardComponent,
    AdminComponent,
    UserComponent,
    AddProductComponent,
    HighlightDirective,
    UserEditComponent,
    DiscountComponent,
    OrderHistoryComponent,
    WishlistComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [LoginService, RegisterService, LogoutService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
