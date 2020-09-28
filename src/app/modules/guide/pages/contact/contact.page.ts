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
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }),
    ],
    zoom: 16,
    center: latLng(35.6908164, 51.3802295),
  };
  layers = [marker([35.6908164, 51.3802295])];

  ngOnInit(): void {}

  onSubmitForm() {
    if (this.form.valid) {
      this.guideService.postContact(this.form.value).subscribe(() => {
        this.dataService.successfullMessage(this.vcRef);
        this.form.reset();
      });
    }
  }
}
