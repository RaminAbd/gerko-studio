import {MultilingualNameModel} from '../../../../core/models/multilingual-name.model';
import {FileModel} from '../../../../core/models/File.model';

export class ProjectsRequestModel {
  id?: any;
  images: any[];
  name: MultilingualNameModel = new MultilingualNameModel();
  description: MultilingualNameModel = new MultilingualNameModel();
  image: FileModel = new FileModel();
  statusId?: any;
  typeId?: any;
  client?: any;
  clientEnabled: boolean;
  size?: any;
  sizeEnabled: boolean;
  address?: any;
  latitude: number;
  longitude: number;
  fakeFile:FileModel = new FileModel();
}
