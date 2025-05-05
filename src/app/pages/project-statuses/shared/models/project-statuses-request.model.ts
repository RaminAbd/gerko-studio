import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';

export class ProjectStatusesRequestModel {
  id: string;
  name: MultilingualNameModel = new MultilingualNameModel();
}
