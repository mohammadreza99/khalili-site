import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { OrdersRoutingModule } from './orders-routing.module';
import { PaymentFailPage } from './pages/payment-fail/payment-fail.page';


@NgModule({
  declarations: [...COMPONENTS, PaymentFailPage],
  exports: [...COMPONENTS],
  imports: [OrdersRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OrdersModule {}
