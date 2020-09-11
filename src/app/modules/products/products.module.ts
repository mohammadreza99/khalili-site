import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { COMPONENTS } from '.';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [ProductsRoutingModule, SharedModule,NgxImageZoomModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProductsModule {}
