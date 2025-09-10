import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DatePipe, Location, NgForOf, NgIf} from '@angular/common';
import { ProjectDetailsService } from './project-details.service';
import {ProjectsResponseModel} from '../../../../admin-projects/shared/models/projects-response.model';
import {TranslatePipe} from '@ngx-translate/core';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {animate, style, transition, trigger} from '@angular/animations';

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
  animations: [
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('300ms ease-in-out', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'scale(0.5)' })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
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
  selectedImage: string;
  showImageLightBox: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getItem()
  }

  openImage(item: any) {
    this.selectedImage = item;
    console.log(item)
    this.showImageLightBox = true;
  }

  closeImageLightbox() {
    this.showImageLightBox = false;
  }
}
