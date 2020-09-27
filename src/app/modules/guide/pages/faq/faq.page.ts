import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteFAQ, SiteFAQCategory } from '../../model/guide.model';
@Component({
  selector: 'faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss']
})
export class FaqPage implements OnInit {
  data$: Observable<SiteFAQ[]>;
  category$: Observable<SiteFAQCategory[]>;
  constructor(private guideService: GuideService,) { }
  
  ngOnInit(): void {
    this.data$ = this.guideService.select<SiteFAQ>('FAQ');
    this.category$ = this.guideService.select<SiteFAQCategory>('FAQCategory');
  }
}