import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';

export class NewsRequestModel {
  id?: any;
  title: MultilingualNameModel = new MultilingualNameModel();
  description:  MultilingualNameModel = new MultilingualNameModel();
  shortDescription:  MultilingualNameModel = new MultilingualNameModel();
  image?: any;
}
