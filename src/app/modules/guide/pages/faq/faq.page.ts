import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteFAQ, SiteFAQCategory } from '../../model/guide.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  data$: Observable<SiteFAQ[]>;
  category;

  constructor(
    private guideService: GuideService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.data$ = this.guideService.getFaq(id);
    this.guideService.getFaqCategories().subscribe((res) => {
      res.forEach((element) => {
        if (element.id == id) this.category = element;
      });
    });
  }
}
