import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core';
import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  @Input() config: SwiperOptions = {};
  @Input() showBullets = false;
  @Input() showArrows = false;
  @Output() onSlideNext = new EventEmitter();
  @Output() onSlidePrev = new EventEmitter();
  @ViewChild('carousel', { static: false }) carousel: SwiperComponent;

  ngOnInit(): void {
    Object.assign(this.config, {
      pagination: { el: '.swiper-pagination', clickable: false },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  slideNext() {
    this.carousel.swiper.slideNext();
    this.onSlideNext.emit(this.carousel.swiper.activeIndex);
  }

  slidePrev() {
    this.carousel.swiper.slidePrev();
    this.onSlidePrev.emit(this.carousel.swiper.activeIndex);
  }

  slideTo(index: number) {
    this.carousel.swiper.slideTo(index);
  }

  _onSlideNext() {
    this.onSlideNext.emit(this.carousel.swiper.activeIndex);
  }

  _onSlidePrev() {
    this.onSlidePrev.emit(this.carousel.swiper.activeIndex);
  }
}
