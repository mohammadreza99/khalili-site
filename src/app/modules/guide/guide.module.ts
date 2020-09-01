import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { GuideRoutingModule } from './guide-routing.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [GuideRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class GuideModule {}
