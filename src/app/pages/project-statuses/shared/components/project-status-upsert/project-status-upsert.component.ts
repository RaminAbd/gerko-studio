import {Component, inject} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStatusUpsertService} from './project-status-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ProjectStatusesRequestModel} from '../../models/project-statuses-request.model';

@Component({
  selector: 'app-project-status-upsert',
  imports: [
    NgClass,
    FormsModule,
    TranslatePipe,
    NgForOf
  ],
  templateUrl: './project-status-upsert.component.html',
  styleUrl: './project-status-upsert.component.scss'
})
export class ProjectStatusUpsertComponent {
  private service: ProjectStatusUpsertService = inject(ProjectStatusUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: ProjectStatusesRequestModel = new ProjectStatusesRequestModel();
  isSubmitted: boolean = false;
  constructor() {
    this.service.component = this;
    this.request = this.config.data;
  }

  save() {
    this.service.save();
  }
}
