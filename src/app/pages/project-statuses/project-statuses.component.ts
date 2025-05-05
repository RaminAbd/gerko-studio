import {Component, inject} from '@angular/core';
import {ProjectStatusesService} from './project-statuses.service';
import {ProjectStatusesResponseModel} from './shared/models/project-statuses-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-project-statuses',
  imports: [
    TableComponent
  ],
  templateUrl: './project-statuses.component.html',
  styleUrl: './project-statuses.component.scss'
})
export class ProjectStatusesComponent {
  private service: ProjectStatusesService = inject(ProjectStatusesService);
  statuses: ProjectStatusesResponseModel[] = [];
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
