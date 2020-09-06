import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main/main/main.page';
import { AuthGuard } from './modules/auth/business/auth.guard';

const routes: Routes = [
  // {
  // path: 'login',
  // component:LoginPage
  // data: { breadcrumb: '' },
  // },
  {
    path: 'auth',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainPage,
    data: { breadcrumb: '' },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'guide',
        loadChildren: () =>
          import('@modules/guide/guide.module').then((m) => m.GuideModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('@modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'sellers',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('@modules/sellers/sellers.module').then(
            (m) => m.SellersModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@modules/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
