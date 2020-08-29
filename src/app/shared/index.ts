import { Type } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductWrapperComponent } from './components/product-wrapper/product-wrapper.component';
import { AdvCardComponent } from './components/adv-card/adv-card.component';


export const COMPONENTS: Type<any>[] = [
    CarouselComponent,
    ProductCardComponent,
    ProductWrapperComponent,
    AdvCardComponent
];
