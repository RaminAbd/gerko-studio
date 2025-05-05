import {ProjectStatusesComponent} from '../../../../pages/project-statuses/project-statuses.component';
import {Route} from '@angular/router';
import {ProjectTypesComponent} from '../../../../pages/project-types/project-types.component';

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
    { path: '', redirectTo: 'project-statuses', pathMatch: 'full' },
    { path: '**', redirectTo: 'project-statuses', pathMatch: 'full' },
  ];
}
