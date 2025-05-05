import {ProjectStatusesComponent} from '../../../../pages/project-statuses/project-statuses.component';
import {Route} from '@angular/router';
import {ProjectTypesComponent} from '../../../../pages/project-types/project-types.component';
import {AdminNewsComponent} from '../../../../pages/admin-news/admin-news.component';
import {NewsUpsertComponent} from '../../../../pages/admin-news/shared/pages/news-upsert/news-upsert.component';
import {AdminProjectsComponent} from '../../../../pages/admin-projects/admin-projects.component';
import {
  ProjectUpsertComponent
} from '../../../../pages/admin-projects/shared/pages/project-upsert/project-upsert.component';

export class AdminChildrenRoutes {
  static children: Route[] = [
    {
      path: 'project-statuses',
      component: ProjectStatusesComponent,
      data: { title: 'Project Statuses' },
    },
    {
      path: 'project-types',
      component: ProjectTypesComponent,
      data: { title: 'Project Types' },
    },
    {
      path: 'news',
      component: AdminNewsComponent,
      data: { title: 'News' },
    },
    {
      path: 'news/:id',
      component: NewsUpsertComponent,
      data: { title: 'News' },
    },
    {
      path: 'projects',
      component: AdminProjectsComponent,
      data: { title: 'Projects' },
    },
    {
      path: 'projects/:id',
      component: ProjectUpsertComponent,
      data: { title: 'Projects' },
    },
    { path: '', redirectTo: 'project-statuses', pathMatch: 'full' },
    { path: '**', redirectTo: 'project-statuses', pathMatch: 'full' },
  ];
}
