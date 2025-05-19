import { Component, inject } from '@angular/core';
import { NewsResponseModel } from '../admin-news/shared/models/news-response.model';
import { NewsService } from './news.service';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  imports: [
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  private service: NewsService = inject(NewsService);
  news: NewsResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAllNews();
  }
}
