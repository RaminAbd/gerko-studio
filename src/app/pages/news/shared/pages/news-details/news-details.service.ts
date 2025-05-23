import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NewsApiService } from '../../../../admin-news/shared/services/news.api.service';
import { NewsComponent } from '../../../news.component';
import { NewsDetailsComponent } from './news-details.component';

@Injectable({
  providedIn: 'root',
})
export class NewsDetailsService {
  private translate: TranslateService = inject(TranslateService);
  private service: NewsApiService = inject(NewsApiService);
  component: NewsDetailsComponent;
  constructor() {}

  getItem() {
    const req = {
      id: this.component.id,
      lang: this.translate.currentLang,
    };
    this.service
      .GetByIdByLang(this.service.serviceUrl, req)
      .subscribe((resp) => {
        this.component.response = resp.data;
        this.component.response.description = resp.data.description
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        console.log(resp.data);
        this.component.response.images = [
          'https://gerkoblob.blob.core.windows.net/images/ea1fb9c8-0a8f-414b-9f78-5dd0b5d7cc1e865b098095ad8b9acf7bfd8ad41f0ee99a30bfb2%20%281%29.webp',
          'https://gerkoblob.blob.core.windows.net/images/b2d97a51-207d-4e06-bd25-9008e769fa538d430480f8896d0724efba28806bdf811e578234%20%281%29.webp',
          'https://gerkoblob.blob.core.windows.net/images/16f57e08-c9f0-429f-b42e-83bbbf1de7bfae657af8be24cbf4f4c0ac10b17e3aeb1b6e7bdb%20%281%29.webp',
        ];
      });
  }
}
