import { Injectable } from '@angular/core';

import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '@app/app.global';
@Injectable({
  providedIn: 'root',
})
export class GuideService extends BaseService {
  constructor() {
    super();
  }

  select<T>(type: string) {
    return this.get<Result<T>>(`/Base/Admin/${type}Select`, 'json').pipe(
      map((res) => res.data)
    );
  }

  insert<T>(type: string, body: T) {
    return this.post(`/Base/Admin/${type}Insert`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  update<T>(type: string, body: T): Observable<T> {
    return this.put(`/Base/Admin/${type}Update`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  activate<T>(type: string, body: T): Observable<T> {
    return this.put(`/Base/Admin/${type}Active`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  deactivate<T>(type: string, body: T): Observable<T> {
    return this.put(`/Base/Admin/${type}DeActive`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getFaq(faqCategoryId?: number) {
    return this.get('/V1/Faq/?faqCategoryId=' + faqCategoryId, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getFaqCategories() {
    return this.get('/V1/FaqCategory/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getTerms() {
    return this.get('/V1/Terms/', 'json').pipe(map((res: any) => res.data));
  }

  getPrivacy() {
    return this.get('/V1/Privacy/', 'json').pipe(map((res: any) => res.data));
  }

  postContact(contact) {
    return this.post('/V1/ContactFormInsert/', contact, 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
