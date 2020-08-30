import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
    data: { title: '' },
  },
  {
    path: 'details/:id',
    component: ProductDetailsPage,
    data: { title: '' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
