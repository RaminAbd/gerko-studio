import {Component, inject, OnDestroy} from '@angular/core';
import { NewsResponseModel } from '../admin-news/shared/models/news-response.model';
import { NewsService } from './news.service';
import {NgForOf} from '@angular/common';
import {LangChangeEvent, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnDestroy {
  private service: NewsService = inject(NewsService);
  private translate: TranslateService = inject(TranslateService);
  news: NewsResponseModel[] = [];
  langSubscribtion: any;
  constructor() {
    this.service.component = this;
    this.service.getAllNews();
    this.langSubscribtion = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.service.getAllNews();
      }
    );
  }

  ngOnDestroy() {
    this.langSubscribtion.unsubscribe();
  }
}
