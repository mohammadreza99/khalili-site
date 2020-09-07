import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPage } from './pages/cart/cart.page';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPage,
    data: { title: '' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
