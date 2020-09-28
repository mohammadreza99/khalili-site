import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteAbout } from '../../model/guide.model';

@Component({
  selector: 'about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  data$: Observable<SiteAbout[]>;
  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.data$ = this.guideService.select<SiteAbout>('About');
  }
}
