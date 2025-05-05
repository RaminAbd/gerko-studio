import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {NewsApiService} from './shared/services/news.api.service';
import {AdminNewsComponent} from './admin-news.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminNewsService {
  private service: NewsApiService = inject(NewsApiService);
  private router: Router = inject(Router);
  private translate: TranslateService = inject(TranslateService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminNewsComponent;
  constructor() { }

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.news = resp.data;
      });
  }

  tableActionHandler(e: any) {
    console.log(e.data)
    switch (e.type) {
      case 1:
        this.router.navigateByUrl('/main/admin/news/create');
        break;
      case 2:
        console.log(e.data.id)
        this.router.navigate(['/main/admin/news/', e.data.id]);
        break;
      case 3:
        this.delete(e.data.id);
        break;
    }
  }

  setCols() {
    this.component.cols = [
      { field: 'title', header: 'Name' },
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
