import {inject, Injectable} from '@angular/core';
import {AboutUsComponent} from '../about-us/about-us.component';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {ContactUsComponent} from './contact-us.component';
import {ContactRequestModel} from './shared/models/contact-request.model';
import {EmailsApiService} from './shared/services/emails.api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  component: ContactUsComponent;
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private emailsService: EmailsApiService = inject(EmailsApiService);

  constructor() {}

  isValid() {
    let result = true;
    if (
      !this.component.request.message ||
      !this.component.request.name ||
      !this.component.request.email
    ) {
      this.message.showTranslatedWarningMessage('Form is not valid!');
      result = false;
      return result;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.component.request.email)) {
      this.message.showTranslatedWarningMessage('Email is not valid');
      result = false;
    }

    return result;
  }

  send() {
    console.log(this.component.request);
    if (this.isValid()) {
      this.emailsService.SendEmail(this.component.request).subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showTranslatedSuccessMessage('Successfully sent!');
          this.component.request = new ContactRequestModel();
        }
      });
    }
  }
}
