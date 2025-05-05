import {Component, inject} from '@angular/core';
import {AdminNewsService} from './admin-news.service';
import {TableComponent} from '../../components/table/table.component';
import {NewsResponseModel} from './shared/models/news-response.model';

@Component({
  selector: 'app-admin-news',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-news.component.html',
  styleUrl: './admin-news.component.scss'
})
export class AdminNewsComponent {
  private service: AdminNewsService = inject(AdminNewsService);
  news: NewsResponseModel[] = [];
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}
