import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { ProductDetailsPage } from './pages/product-details/product-details.page';
import { ProductSubcategoryPage } from './pages/product-subcategory/product-subcategory.page';
import { ProductCategoryPage } from './pages/product-category/product-category.page';

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
  {
    path: 'category/:id',
    component: ProductCategoryPage,
    data: { title: '' },
  },
  {
    path: 'subcategory/:id',
    component: ProductSubcategoryPage,
    data: { title: '' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
