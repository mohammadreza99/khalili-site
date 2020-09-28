import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteFAQCategory } from '../../model/guide.model';
@Component({
  selector: 'faq-category',
  templateUrl: './faq-category.page.html',
  styleUrls: ['./faq-category.page.scss'],
})
export class FaqCategoryPage implements OnInit {
  data$: Observable<SiteFAQCategory[]>;
  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.data$ = this.guideService.getFaqCategories();
  }
}
