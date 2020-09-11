import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteTerms } from '../../model/guide.model';
import { BasicService } from '../../business/guide.service';

@Component({
  selector: 'terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss']
})
export class TermsPage implements OnInit {

  data$: Observable<SiteTerms[]>;

  constructor( private basicService: BasicService) { }

  ngOnInit(): void {
    this.data$ = this.basicService.select<SiteTerms>('Terms');
  }
}
