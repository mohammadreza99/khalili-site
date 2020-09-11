import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteFAQCategory } from '../../model/guide.model';
@Component({
  selector: 'faq-category',
  templateUrl: './faq-category.page.html',
  styleUrls: ['./faq-category.page.scss']
})
export class FaqCategoryPage implements OnInit {

  data$: Observable<SiteFAQCategory[]>;
  constructor(private basicService: BasicService,) { }
  
  ngOnInit(): void {
    this.data$ = this.basicService.select<SiteFAQCategory>('FAQCategory');
  }
}
