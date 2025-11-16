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
        this.getProjectItems(structuredClone(resp.data));
        this.getBannerItems(structuredClone(resp.data))
      });
  }

  getProjectItems(data:any[]){
    const selectedIds = [
      '58ff773a-0bca-4a94-a46a-32efcf59fef9',
      '9dfc17af-15c5-42b9-b0ac-cdbba4a20a80',
      'd8b81b05-40eb-4490-aa77-67fbdbcc6bc1',
      'f6700205-361d-48a6-be6e-df5bbe0ce775',
      '8dc44aaf-6be8-4e60-ab11-457811dd9e0a',
      'f5c2516f-2e91-4ff5-a6d4-cdf6017a2994',
      '606808d3-698d-4489-8bff-829c413840e5',
      'db0f314f-918e-4686-91cf-120f72392321',
      'd5aaac51-ade3-4c5f-91d9-8e895523b240',
    ];
    const filtered:any[] = []
    data.forEach(item => {
      if(selectedIds.includes(item.id)){
        filtered.push(item);
      }
    })
    this.component.projects = filtered;
  }

  getBannerItems(data:any[]){
    console.log(data);
    const selectedIds = [
      '58ff773a-0bca-4a94-a46a-32efcf59fef9',
      '9dfc17af-15c5-42b9-b0ac-cdbba4a20a80',
      'd8b81b05-40eb-4490-aa77-67fbdbcc6bc1',
      'f6700205-361d-48a6-be6e-df5bbe0ce775',
      '8dc44aaf-6be8-4e60-ab11-457811dd9e0a'
    ];
    const filtered:any[] = []

    data.forEach(item => {
      if(selectedIds.includes(item.id)){
        filtered.push(item);
      }
    })
    console.log(filtered)

    this.component.bannerItems = filtered.map((item:any) => ({
      url:item.image,
      id: item.id,
    }))
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
