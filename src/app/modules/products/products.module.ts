import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductSubcategoryComponent } from './pages/product-subcategory/product-subcategory.component';

@NgModule({
  declarations: [...COMPONENTS, ProductSubcategoryComponent],
  exports: [...COMPONENTS],
  imports: [ProductsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProductsModule {}
