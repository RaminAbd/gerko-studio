import { AfterViewInit, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { ContactRequestModel } from './shared/models/contact-request.model';
import { ContactUsService } from './contact-us.service';
declare const google: any;
@Component({
  selector: 'app-contact-us',
  imports: [TranslatePipe, GoogleMap, MapMarker, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  request: ContactRequestModel = new ContactRequestModel();
  private service: ContactUsService = inject(ContactUsService);
  center: google.maps.LatLngLiteral = {
    lat: 41.6875095,
    lng: 44.8264149,
  };
  googleMapsApiKey: any = 'AIzaSyDx3Vf8XcVPGaKoQcIaldQgPzd7gAyTXCA';
  constructor() {
    this.service.component = this;
  }

  send() {
    this.service.send();
  }

  generateGoogleMapsLink(event: any) {
    event.stopPropagation();
    let url = `https://www.google.com/maps?q=${41.6875095},${44.8264149}&key=${this.googleMapsApiKey}`;
    window.open(url, '_blank');
  }
}
