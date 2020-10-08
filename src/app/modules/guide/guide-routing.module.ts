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
    path: 'faq-category',
    component: FaqCategoryPage,
    data: { title: 'پرسش های متداول' },
  },
  {
    path: 'faq/:id',
    component: FaqPage,
    data: { title: 'پرسش های متداول'  },
  },
  {
    path: 'privacy',
    component: PrivacyPage,
    data: { title: 'حریم خصوصی' },
  },
  {
    path: 'terms',
    component: TermsPage,
    data: { title: 'قوانین و مقررات' },
  },
  {
    path: 'about',
    component: AboutPage,
    data: { title: 'درباره ما' },
  },
  {
    path: 'contact',
    component: ContactPage,
    data: { title: 'تماس با ما' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
