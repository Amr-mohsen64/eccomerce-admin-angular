import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { UserLoginComponent } from './Components/UserLogin/UserLogin.component';
import { EditProdComponent } from './Components/Order/edit-prod/edit-prod.component';

const routes: Routes = [ // First-match wins strategy
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' }, //Default path
      { path: 'Home', component: HomeComponent },
      { path: 'Products', component: ProductListComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent },
      { path: 'Products/add/:pid', component: AddProductComponent },
      { path: 'Products/edit/:pid', component: AddProductComponent },
      { path: 'Order', component: OrderMasterComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'Login', component: UserLoginComponent },
  { path: 'Logout', component: UserLoginComponent },
  { path: 'Register', component: UserRegisterComponent },
  { path: '**', component: NotFoundComponent }// Wild card path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
