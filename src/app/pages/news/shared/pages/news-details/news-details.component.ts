import { Component, inject } from '@angular/core';
import {DatePipe, Location, NgForOf} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsResponseModel } from '../../../../admin-news/shared/models/news-response.model';
import {NewsDetailsService} from './news-details.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-news-details',
  imports: [
    TranslatePipe,
    DatePipe,
    NgForOf
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
})
export class NewsDetailsComponent {
  private servive: NewsDetailsService = inject(NewsDetailsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public location: Location = inject(Location);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: NewsResponseModel = new NewsResponseModel();
  constructor() {
    this.servive.component=this;
    this.servive.getItem()
  }
}
