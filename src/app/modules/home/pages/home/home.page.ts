import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../business/home.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private homeService: HomeService) {}

  zoomedImageSrc = '../../../assets/images/logo.png';
  zoomedImageSrc1 = '../../../assets/images/1.jpg';
  mainSliderConfig = {
    effect: 'fade',
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  };
  offerConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      '575': { slidesPerView: 1 },
      '768 ': { slidesPerView: 2 },
      '992 ': { slidesPerView: 3 },
    },
  };
  menu: any[];
  slider$: any;
  amazingOffers: { title: string; obj: any[] };
  mostViewed: { title: string; obj: any[] };
  categoryVarious: { title: string; obj: any[] };
  newProducts: { title: string; obj: any[] };
  mostSellers: { title: string; obj: any[] };
  homePageCases: {
    moreThen: boolean;
    obj: any[];
    orderNo: number;
    title: string;
    typeId: number;
  }[];

  ngOnInit(): void {
    this.slider$ = this.homeService.getSlider();
    this.homeService.getAllHomePage().subscribe((res) => {
      this.amazingOffers = res[0];
      this.mostViewed = res[1];
      this.categoryVarious = res[2];
      this.newProducts = res[3];
      this.mostSellers = res[4];
      console.log(res);
      this.homePageCases = res;
    });
  }

  onMouseEnterMenuItem(id: string) {
    document.querySelector('#' + id).classList.add('show');
  }

  onMouseLeaveMenuItem(id: string) {
    document.querySelector('#' + id).classList.remove('show');
  }
}
