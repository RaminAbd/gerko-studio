import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsUpsertService} from './news-upsert.service';
import {NewsRequestModel} from '../../models/news-request.model';
import {UpsertHeadingComponent} from '../../../../../components/upsert-heading/upsert-heading.component';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import { Location  } from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
@Component({
  selector: 'app-news-upsert',
  imports: [
    UpsertHeadingComponent,
    TranslatePipe,
    NgClass,
    FormsModule,
    NgIf,
    NgForOf,
    CustomEditorComponent,
    DatePicker,

  ],
  templateUrl: './news-upsert.component.html',
  styleUrl: './news-upsert.component.scss'
})
export class NewsUpsertComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: NewsUpsertService = inject(NewsUpsertService);
  public location: Location = inject(Location);
  id = this.route.snapshot.paramMap.get('id') as string;
  request: NewsRequestModel = new NewsRequestModel();
  isSubmitted: boolean = false;
  date:any;
  constructor() {
    this.service.component = this;
    this.service.getInfo();
  }

  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image.fileLoading = false;
      this.request.image = resp.data;
      this.request.image.fakeFile = null;
      this.request.image.isValid = true;
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  save() {
    this.service.save();
  }
}
