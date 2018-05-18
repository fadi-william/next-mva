// The imported libs.
import Axios from "./axios";

interface IShow {
  id: number;
  image: {
    medium: string;
  };
  name: string;
  summary: string;
}

interface IShowResponseModel {
  show: IShow;
}

interface IShowsResponseModel extends Array<IShowResponseModel> {}

export function getShows() {
  return Axios.get<IShowsResponseModel>(
    "https://api.tvmaze.com/search/shows?q=batman"
  );
}

export function getShow(id: number) {
  return Axios.get<IShowResponseModel>(`https://api.tvmaze.com/shows/${id}`);
}
