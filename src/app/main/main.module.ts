import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { SharedModule } from '@app/shared/shared.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
@NgModule({
  declarations: [HomePage],
  exports: [HomePage],
  imports: [CommonModule, SharedModule,NgxImageZoomModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class MainModule {}
