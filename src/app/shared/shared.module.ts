import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { COMPONENTS } from '.';

@NgModule({
  declarations: [...COMPONENTS ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxUsefulSwiperModule,
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxUsefulSwiperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class SharedModule {}
