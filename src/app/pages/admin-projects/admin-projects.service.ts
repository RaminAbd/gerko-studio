import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {ProjectsApiService} from './shared/services/projects.api.service';
import {AdminProjectsComponent} from './admin-projects.component';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectsService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private router: Router = inject(Router);
  private translate: TranslateService = inject(TranslateService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminProjectsComponent;
  constructor() { }

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.projects = resp.data;
      });
  }

  tableActionHandler(e: any) {
    console.log(e.data)
    switch (e.type) {
      case 1:
        this.router.navigateByUrl('/main/admin/projects/create');
        break;
      case 2:
        console.log(e.data.id)
        this.router.navigate(['/main/admin/projects/', e.data.id]);
        break;
      case 3:
        this.delete(e.data.id);
        break;
    }
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Name' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showTranslatedSuccessMessage(
          'Successfully deleted category',
        );
        this.getAll();
      }
    });
  }
}
