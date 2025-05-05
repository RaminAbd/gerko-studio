import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../core/services/ApplicationMessageCenter.service';
import {BaseApiService} from '../../../core/services/base.api.service';
import {AuthRequestModel} from '../models/auth-request.model';
import {AuthResponseModel} from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {
  serviceUrl = 'authentication/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }
  SignIn(req: AuthRequestModel) {
    return this.http.post<AuthResponseModel>(this.BASE_URL+this.serviceUrl + 'sign-in', req);
  }
}
