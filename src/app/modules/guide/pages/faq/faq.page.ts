import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../business/guide.service';
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
  constructor(private basicService: BasicService,) { }
  
  ngOnInit(): void {
    this.data$ = this.basicService.select<SiteFAQ>('FAQ');
    this.category$ = this.basicService.select<SiteFAQCategory>('FAQCategory');
  }
}