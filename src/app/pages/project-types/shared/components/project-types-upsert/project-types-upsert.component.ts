import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectTypesUpsertService} from './project-types-upsert.service';
import {ProjectTypesRequestModel} from '../../models/project-types-request.model';

@Component({
  selector: 'app-project-types-upsert',
  imports: [
    FormsModule,
    NgForOf,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './project-types-upsert.component.html',
  styleUrl: './project-types-upsert.component.scss'
})
export class ProjectTypesUpsertComponent {
  private service: ProjectTypesUpsertService = inject(ProjectTypesUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: ProjectTypesRequestModel = new ProjectTypesRequestModel();
  isSubmitted: boolean = false;
  constructor() {
    this.service.component = this;
    this.request = this.config.data;
  }

  save() {
    this.service.save();
  }
}
