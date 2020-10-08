import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  constructor(private route: ActivatedRoute) {}

  trackingNumber = "123";
  ngOnInit(): void {
    this.trackingNumber = this.route.snapshot.queryParamMap.get(
      'trackingNumber'
    );
  }
}
