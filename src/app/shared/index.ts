import { Type } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdvCardComponent } from './components/adv-card/adv-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';

export const COMPONENTS: Type<any>[] = [
  CarouselComponent,
  ProductCardComponent,
  ProductsSliderComponent,
  AdvCardComponent,
  NavbarComponent,
  LogoComponent,
  DropdownComponent,
  ClickOutsideDirective,
  FooterComponent,
];
