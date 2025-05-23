import { Component } from '@angular/core';
import {GuestHeaderComponent} from './shared/components/guest-header/guest-header.component';
import {RouterOutlet} from '@angular/router';
import {GuestFooterComponent} from './shared/components/guest-footer/guest-footer.component';
import {ScrollerComponent} from "../../pages/home/shared/scroller/scroller.component";

@Component({
  selector: 'app-guest',
    imports: [
        GuestHeaderComponent,
        RouterOutlet,
        GuestFooterComponent,
        ScrollerComponent
    ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

}
