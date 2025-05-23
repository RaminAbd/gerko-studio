import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
import {ProjectsComponent} from '../../../../pages/projects/projects.component';
import {NewsComponent} from '../../../../pages/news/news.component';
import {AboutUsComponent} from '../../../../pages/about-us/about-us.component';
import {ContactUsComponent} from '../../../../pages/contact-us/contact-us.component';
import {
  ProjectDetailsComponent
} from '../../../../pages/projects/shared/pages/project-details/project-details.component';
import {NewsDetailsComponent} from '../../../../pages/news/shared/pages/news-details/news-details.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'projects', component: ProjectsComponent, data: { title: 'Projects' } },
    { path: 'projects/:id', component: ProjectDetailsComponent, data: { title: 'Projects' } },
    { path: 'news', component: NewsComponent, data: { title: 'News' } },
    { path: 'news/:id', component: NewsDetailsComponent, data: { title: 'News' } },
    { path: 'about', component: AboutUsComponent, data: { title: 'About us' } },
    { path: 'contact', component: ContactUsComponent, data: { title: 'Contact us' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
