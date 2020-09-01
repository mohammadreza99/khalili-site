import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { SellersRoutingModule } from './sellers-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [SellersRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SellersModule {}
