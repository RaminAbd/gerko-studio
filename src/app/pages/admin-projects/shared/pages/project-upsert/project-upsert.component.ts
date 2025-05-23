import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location, NgClass, NgForOf, NgIf} from '@angular/common';
import {ProjectUpsertService} from './project-upsert.service';
import {ProjectsRequestModel} from '../../models/projects-request.model';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {UpsertHeadingComponent} from '../../../../../components/upsert-heading/upsert-heading.component';
import {ProjectStatusesResponseModel} from '../../../../project-statuses/shared/models/project-statuses-response.model';
import {ProjectTypesResponseModel} from '../../../../project-types/shared/models/project-types-response.model';
import {DropdownModule} from 'primeng/dropdown';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-project-upsert',
  imports: [
    CustomEditorComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    UpsertHeadingComponent,
    FormsModule,
    NgClass,
    DropdownModule,
    DatePicker
  ],
  templateUrl: './project-upsert.component.html',
  styleUrl: './project-upsert.component.scss'
})
export class ProjectUpsertComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: ProjectUpsertService = inject(ProjectUpsertService);
  public location: Location = inject(Location);
  id = this.route.snapshot.paramMap.get('id') as string;
  request: ProjectsRequestModel = new ProjectsRequestModel();
  statuses:ProjectStatusesResponseModel[]=[]
  types:ProjectTypesResponseModel[]=[]
  isSubmitted: boolean = false;
  date:any;
  constructor() {
    this.service.component = this;
    this.service.getStatuses();
  }

  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image.fileLoading = false;
      this.request.image = resp.data;
      this.request.image.fakeFile = null;
      this.request.image.isValid = true;
    });
  }

  getFiles(e: any) {
    this.request.fakeFile.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.fakeFile.fileLoading = false;
      this.request.fakeFile = resp.data;
      this.request.fakeFile.fakeFile = null;
      this.request.fakeFile.isValid = true;
      this.request.images.push(resp.data);
      console.log(this.request)
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  removeImage(i: number) {
    this.request.images.splice(i, 1);
  }

  save() {
    this.service.save();
  }
}
