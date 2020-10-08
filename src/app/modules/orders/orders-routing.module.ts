import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPage } from './pages/cart/cart.page';
import { ShippingPage } from './pages/shipping/shipping.page';
import { PaymentSuccessPage } from './pages/payment-success/payment-success.page';
import { PaymentFailPage } from './pages/payment-fail/payment-fail.page';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPage,
    data: { title: 'سبد خرید' },
  },
  {
    path: 'shipping',
    component: ShippingPage,
    data: { title: 'مشخصات تحویل' },
  },
  {
    path: 'payment-success',
    component: PaymentSuccessPage,
    data: { title: 'خرید موفق' },
  },
  {
    path: 'payment-fail',
    component: PaymentFailPage,
    data: { title: 'خربد ناموفق' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
