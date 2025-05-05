import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';

export class ProjectTypesRequestModel {
  id: string;
  name: MultilingualNameModel = new MultilingualNameModel();
}
