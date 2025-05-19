import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NewsApiService} from '../admin-news/shared/services/news.api.service';
import {NewsComponent} from './news.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private translate: TranslateService = inject(TranslateService);
  private newsService: NewsApiService = inject(NewsApiService);
  component:NewsComponent;
  constructor() { }
  getAllNews() {
    this.newsService
      .GetAllByLang(this.newsService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.news = resp.data;
        this.component.news.forEach((item) => {
          item.shortDescription = item.shortDescription
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        });
      });
  }
}
