import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main/main/main.page';

const routes: Routes = [
  // {
  // path: 'login',
  // component:LoginPage
  // data: { breadcrumb: '' },
  // },
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
