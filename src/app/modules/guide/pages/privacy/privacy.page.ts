import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SitePrivacy } from '../../model/guide.model';
import { BasicService } from '../../business/guide.service';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss']
})
export class PrivacyPage implements OnInit {
  data$: Observable<SitePrivacy[]>;

  constructor( private basicService: BasicService) { }

  ngOnInit(): void {
    this.data$ = this.basicService.select<SitePrivacy>('Privacy');
  }
}
