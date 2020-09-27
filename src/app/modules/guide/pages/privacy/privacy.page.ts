import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SitePrivacy } from '../../model/guide.model';
import { GuideService } from '../../business/guide.service';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  data$;

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.data$ = this.guideService.getPrivacy();
  }
}
