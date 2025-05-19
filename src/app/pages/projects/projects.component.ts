import { Component, inject } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { ProjectsService } from './projects.service';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  imports: [
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private service: ProjectsService = inject(ProjectsService);
  projects: ProjectsResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAllProjects();
  }
}
