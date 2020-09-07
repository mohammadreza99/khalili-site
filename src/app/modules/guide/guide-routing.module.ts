import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqCategoryPage } from './pages/faq-category/faq-category.page';
import { FaqPage } from './pages/faq/faq.page';
import { PrivacyPage } from './pages/privacy/privacy.page';
import { TermsPage } from './pages/terms/terms.page';
import { AboutPage } from './pages/about/about.page';
import { ContactPage } from './pages/contact/contact.page';

const routes: Routes = [
  {
    path: 'faq-category/:id',
    component: FaqCategoryPage,
    data: { title: '' },
  },
  {
    path: 'faq/:id',
    component: FaqPage,
    data: { title: '' },
  },
  {
    path: 'privacy',
    component: PrivacyPage,
    data: { title: '' },
  },
  {
    path: 'terms',
    component: TermsPage,
    data: { title: '' },
  },
  {
    path: 'about',
    component: AboutPage,
    data: { title: '' },
  },
  {
    path: 'contact',
    component: ContactPage,
    data: { title: '' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
