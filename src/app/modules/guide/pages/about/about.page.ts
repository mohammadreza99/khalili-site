import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../business/guide.service';
import { Observable } from 'rxjs';
import { SiteAbout } from '../../model/guide.model';

@Component({
  selector: 'about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  data$: Observable<SiteAbout[]>;
  constructor(private basicService: BasicService,) { }
  
  ngOnInit(): void {
    this.data$ = this.basicService.select<SiteAbout>('About');
  }

}
