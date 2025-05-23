import { Component, inject } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ProjectsResponseModel } from '../admin-projects/shared/models/projects-response.model';
import { ProjectsService } from './projects.service';
import {DatePipe, NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink,
    DatePipe
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
