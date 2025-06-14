import {inject, Injectable} from '@angular/core';
import {ProjectsApiService} from '../admin-projects/shared/services/projects.api.service';
import {TranslateService} from '@ngx-translate/core';
import {ProjectsComponent} from './projects.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private translate: TranslateService = inject(TranslateService);
  component:ProjectsComponent
  constructor() { }

  getAllProjects() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.projects = resp.data;
        console.log(this.component.projects);
      });
  }
}
