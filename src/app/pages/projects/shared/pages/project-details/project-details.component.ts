import {Component, ElementRef, inject, ViewChild} from '@angular/core';
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

  showImageLightBox = false;
  selectedImage!: string;
  currentIndex = 0;
  constructor() {
    this.service.component = this;
    this.service.getItem()
  }
  //
  // openImage(item: any) {
  //   this.selectedImage = item;
  //   console.log(item)
  //   this.showImageLightBox = true;
  // }

  // closeImageLightbox() {
  //   this.showImageLightBox = false;
  // }

  openImageLightbox(index: number) {
    this.currentIndex = index;
    this.selectedImage = this.response.images[index];
    this.showImageLightBox = true;
  }

  closeImageLightbox() {
    this.showImageLightBox = false;
  }

  nextImage(event: MouseEvent) {
    event.stopPropagation();
    if (this.currentIndex < this.response.images.length - 1) {
      this.currentIndex++;
      this.selectedImage = this.response.images[this.currentIndex];
    }
  }

  prevImage(event: MouseEvent) {
    event.stopPropagation();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImage = this.response.images[this.currentIndex];
    }
  }



  @ViewChild('mapSection') mapSection!: ElementRef;

  scrollToMap() {
    this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  mapOptions: google.maps.MapOptions = {
    styles: [
      {
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
    ],
  };


}
