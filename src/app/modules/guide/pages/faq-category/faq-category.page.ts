import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteFAQ, SiteFAQCategory } from '../../model/guide.model';
@Component({
  selector: 'faq-category',
  templateUrl: './faq-category.page.html',
  styleUrls: ['./faq-category.page.scss'],
})
export class FaqCategoryPage implements OnInit {
  category$: Observable<SiteFAQCategory[]>;
  data$: Observable<SiteFAQ[]>;
  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.category$ = this.guideService.getFaqCategories();
    this.data$ = this.guideService.getFaq();
  }
}
