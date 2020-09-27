import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteTerms } from '../../model/guide.model';
import { GuideService } from '../../business/guide.service';

@Component({
  selector: 'terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  data$;

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.data$ = this.guideService.getTerms();
  }
}
