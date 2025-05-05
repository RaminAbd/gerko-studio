import {Component, inject} from '@angular/core';
import {TableComponent} from "../../components/table/table.component";
import {ProjectTypesService} from './project-types.service';
import {ProjectTypesResponseModel} from './shared/models/project-types-response.model';

@Component({
  selector: 'app-project-types',
    imports: [
        TableComponent
    ],
  templateUrl: './project-types.component.html',
  styleUrl: './project-types.component.scss'
})
export class ProjectTypesComponent {
  private service: ProjectTypesService = inject(ProjectTypesService);
  types: ProjectTypesResponseModel[] = [];
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
