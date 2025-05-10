import {inject, Injectable} from '@angular/core';
import {ProjectsApiService} from '../admin-projects/shared/services/projects.api.service';
import {TranslateService} from '@ngx-translate/core';
import {HomeComponent} from './home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private service:ProjectsApiService=inject(ProjectsApiService)
  private translate:TranslateService=inject(TranslateService);
  component:HomeComponent
  constructor() { }

  getAllProjects(){
    this.service.GetAllByLang(this.service.serviceUrl,this.translate.currentLang).subscribe(resp=>{
      this.component.projects = resp.data;
    })
  }
}
