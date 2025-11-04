import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../admin-projects/shared/services/projects.api.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { NewsApiService } from '../admin-news/shared/services/news.api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private translate: TranslateService = inject(TranslateService);
  private newsService: NewsApiService = inject(NewsApiService);
  component: HomeComponent;
  constructor() {}

  getAllProjects() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.projects = resp.data.splice(0, 6);
        console.log(this.component.projects);
        this.component.bannerItems = this.component.projects.map((item:any) => ({
          url:item.image
        }))
        console.log(this.component.bannerItems);
      });
  }

  getAllNews() {
    this.newsService
      .GetAllByLang(this.newsService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.news = resp.data.splice(0, 5);
        this.component.news.forEach((item) => {
          item.shortDescription = item.shortDescription
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        });
      });
  }
}
