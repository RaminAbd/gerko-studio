import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GalleriaModule } from 'primeng/galleria';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { HomeService } from './home.service';
import {NewsResponseModel} from '../admin-news/shared/models/news-response.model';
import {ScrollerComponent} from './shared/scroller/scroller.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, GalleriaModule, ScrollerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private service: HomeService = inject(HomeService);
  projects: ProjectsResponseModel[] = [];
  news:NewsResponseModel[]=[];
  bannerItems: any[] = [
    {
      url: 'https://gerkoblob.blob.core.windows.net/images/28ce3d02-2250-45ec-86bd-628c7f553c37d3f00a9f74f7ada780e8fceb016ff0ae20314a8a%20%281%29.png',
    },
    {
      url: 'https://gerkoblob.blob.core.windows.net/images/28ce3d02-2250-45ec-86bd-628c7f553c37d3f00a9f74f7ada780e8fceb016ff0ae20314a8a%20%281%29.png',
    },
  ];

  constructor() {
    this.service.component = this;
    this.service.getAllProjects();
    this.service.getAllNews();
  }
}
