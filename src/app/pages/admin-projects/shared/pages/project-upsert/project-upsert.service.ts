import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BlobService } from '../../../../../core/services/blob.service';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';
import { FileModel } from '../../../../../core/models/File.model';
import { ProjectsApiService } from '../../services/projects.api.service';
import { ProjectUpsertComponent } from './project-upsert.component';
import { ProjectTypesApiService } from '../../../../project-types/shared/services/project-types.api.service';
import { ProjectStatusesApiService } from '../../../../project-statuses/shared/services/project-statuses.api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectUpsertService {
  private service: ProjectsApiService = inject(ProjectsApiService);
  private translate: TranslateService = inject(TranslateService);
  private typesService: ProjectTypesApiService = inject(ProjectTypesApiService);
  private statusesService: ProjectStatusesApiService = inject(
    ProjectStatusesApiService
  );
  private blob: BlobService = inject(BlobService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  component: ProjectUpsertComponent;
  constructor() {}

  getStatuses() {
    this.statusesService
      .GetAllByLang(this.statusesService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.statuses = resp.data;
        this.getTypes();
      });
  }
  private getTypes() {
    this.typesService
      .GetAllByLang(this.typesService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.types = resp.data;
        this.getInfo();
      });
  }

  getInfo() {
    if (this.component.id === 'create') {
      this.getForm();
    } else {
      this.getById();
    }
  }

  private getForm() {
    this.service.GetForm(this.service.serviceUrl).subscribe((resp) => {
      this.component.request = resp.data;
      this.component.request.image = new FileModel();
      this.component.request.fakeFile = new FileModel();
    });
  }

  private getById() {
    this.service
      .GetById(this.service.serviceUrl, this.component.id)
      .subscribe((resp) => {
        this.component.request = resp.data;
        console.log(this.component.request);
        this.component.request.fakeFile = new FileModel();
        if (resp.data.date) {
          this.component.date = new Date(resp.data.date);
        }
      });
  }

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

  save() {
    if (this.component.date) {
      const publishTime = new Date(structuredClone(this.component.date));
      this.component.request.date = publishTime.toISOString();
    }
    console.log(this.component.request);
    if (this.component.id === 'create') {
      this.create();
    } else {
      this.update();
    }
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.component.location.back();
          this.message.showSuccessMessage('Success', 'Created successfully!');
        }
      });
  }

  private update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.component.location.back();
          this.message.showSuccessMessage('Success', 'Updated successfully!');
        }
      });
  }
}
