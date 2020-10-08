import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path: 'profile',
    data: { title: 'پرفایل کاربری' },
    component: ProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
