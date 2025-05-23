export class ProjectsResponseModel {
  id: string;
  images: string[];
  name: string;
  description: string;
  image: string;
  status: string;
  type: string;
  client: string;
  clientEnabled: boolean;
  size?: any;
  sizeEnabled: boolean;
  address: string;
  latitude: number;
  longitude: number;
  shortDescription:string;
  date:any;
}
