import {Component, inject, OnDestroy} from '@angular/core';
import { HomeService } from '../home/home.service';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { ProjectsService } from './projects.service';
import {DatePipe, NgForOf} from '@angular/common';
import {LangChangeEvent, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink,
    DatePipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnDestroy{
  private service: ProjectsService = inject(ProjectsService);
  private translate: TranslateService = inject(TranslateService);
  projects: ProjectsResponseModel[] = [];
  langSubscribtion: any;
  constructor() {
    this.service.component = this;
    this.service.getAllProjects();
    this.langSubscribtion = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.service.getAllProjects();
      }
    );
  }
  ngOnDestroy() {
    this.langSubscribtion.unsubscribe();
  }
}
