import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DatePipe, Location, NgForOf, NgIf} from '@angular/common';
import { ProjectDetailsService } from './project-details.service';
import {ProjectsResponseModel} from '../../../../admin-projects/shared/models/projects-response.model';
import {TranslatePipe} from '@ngx-translate/core';
import {GoogleMap, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-project-details',
  imports: [
    TranslatePipe,
    DatePipe,
    NgIf,
    GoogleMap,
    MapMarker,
    NgForOf
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: ProjectDetailsService = inject(ProjectDetailsService);
  public location: Location = inject(Location);
  id = this.route.snapshot.paramMap.get('id') as string;
  response:ProjectsResponseModel=new ProjectsResponseModel();
  center: google.maps.LatLngLiteral = {
    lat: 41.7276044,
    lng: 44.6419557,
  };
  point: google.maps.LatLngLiteral = {
    lat: 41.7276044,
    lng: 44.6419557,
  };

  constructor() {
    this.service.component = this;
    this.service.getItem()
  }
}
