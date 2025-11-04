import {Component, inject, OnDestroy} from '@angular/core';
import {LangChangeEvent, TranslatePipe, TranslateService} from '@ngx-translate/core';
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
export class HomeComponent implements OnDestroy{
  private service: HomeService = inject(HomeService);
  private translate: TranslateService = inject(TranslateService);
  projects: ProjectsResponseModel[] = [];
  news:NewsResponseModel[]=[];
  bannerItems: any[] = [
  ];
  langSubscribtion: any;
  constructor() {
    this.service.component = this;
    this.service.getAllProjects();
    this.service.getAllNews();
    this.langSubscribtion = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.service.getAllProjects();
        this.service.getAllNews();
      }
    );
  }
  ngOnDestroy() {
    this.langSubscribtion.unsubscribe();
  }
}
