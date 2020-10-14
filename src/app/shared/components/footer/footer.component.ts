import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HomeService } from '@app/modules/home/business/home.service';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'ag-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  footerDescription$;
  socials$;
  applications$;
  footerItems = [];
  emailFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.footerDescription$ = this.homeService.getFooterDescription();
    this.socials$ = this.homeService.getSocials();
    this.applications$ = this.homeService.getAplications();
    this.homeService.getFooterMenu().subscribe((res) => {
      for (const item of res) {
        if (item.parentId == null) {
          this.footerItems.push({
            title: item.title,
            link: item.link,
            children: this.getChildren(item, res),
          });
        }
      }
    });
  }

  getChildren(item, list) {
    let result = [];
    for (const o of list) {
      if (o.parentId == item.id) {
        result.push({
          title: o.title,
          link: o.link,
        });
      }
    }
    return result;
  }

  getFooterMenu() {}

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  submitEmail() {
    if (this.emailFormControl.valid) {
      this.homeService
        .insertNews(this.emailFormControl.value)
        .subscribe((res) => {
          this.emailFormControl.reset();
          this.dataService.successfullMessage(this.vcRef);
        });
    }
  }
}
