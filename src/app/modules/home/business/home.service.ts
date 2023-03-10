import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseService {
  getMenu() {
    return this.get('/V1/Menu/', 'json').pipe(map((res: any) => res.data));
  }

  getSlider() {
    return this.get('/V1/Slider/', 'json').pipe(map((res: any) => res.data));
  }

  getAllHomePage() {
    return this.get('/V1/OnePage/', 'json').pipe(map((res: any) => res.data));
  }

  getFooterDescription() {
    return this.get('/V1/AboutMainPage/', 'json').pipe(
      map((res: any) => res.data[0].shortDescription)
    );
  }

  getSocials() {
    return this.get('/V1/Social/', 'json').pipe(map((res: any) => res.data));
  }

  insertNews(Email: string) {
    return this.post('/V1/NewsInsert/', { Email }, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getFooterMenu() {
    return this.get('/V1/FooterMenu/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getAplications() {
    return this.get('/V1/Application/', 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
