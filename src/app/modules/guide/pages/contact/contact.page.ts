import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { tileLayer, latLng, marker } from 'leaflet';
import { GuideService } from '../../business/guide.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  constructor(
    private guideService: GuideService,
    private vcRef: ViewContainerRef,
    private dataService: DataService
  ) {}

  form = new FormGroup({
    title: new FormControl(),
    fullName: new FormControl(),
    email: new FormControl(null, Validators.email),
    telPhone: new FormControl(),
    description: new FormControl(null, Validators.required),
  });
  options;
  layers;
  contactInfo;

  ngOnInit(): void {
    this.guideService.getContactUsInfo().subscribe((res) => {
      this.contactInfo = res[0];
      this.options = {
        layers: [
          tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        ],
        zoom: 5,
        center: latLng(this.contactInfo.lat, this.contactInfo.lng),
      };
      this.layers = [marker([this.contactInfo.lat, this.contactInfo.lng])];
    });
  }

  onSubmitForm() {
    if (this.form.valid) {
      this.guideService.postContact(this.form.value).subscribe(() => {
        this.dataService.successfullMessage(this.vcRef);
        this.form.reset();
      });
    }
  }
}
