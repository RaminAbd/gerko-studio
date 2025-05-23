import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../../../admin-projects/shared/services/projects.api.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectDetailsComponent } from './project-details.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private translate: TranslateService = inject(TranslateService);
  component: ProjectDetailsComponent;
  constructor() {}

  getItem() {
    const req = {
      id: this.component.id,
      lang: this.translate.currentLang,
    };
    this.service
      .GetByIdByLang(this.service.serviceUrl, req)
      .subscribe((resp) => {
        this.component.response = resp.data;
        this.component.response.description = resp.data.description
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        console.log(resp.data);
        this.component.point.lat = this.component.response.latitude
        this.component.point.lng = this.component.response.longitude
      });
  }
}
