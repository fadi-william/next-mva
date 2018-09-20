import jsonQuery from "json-query";
import shows from "./getShows.json";

export function getShow(id: number) {
  const data = jsonQuery(`[show][*id=${id}]`, { data: shows }).value[0];

  return new Promise(resolve => {
    resolve({
      data,
      status: 200
    });
  });
}

export function getShows() {
  return new Promise(resolve => {
    resolve({
      data: shows,
      status: 200
    });
  });
}
