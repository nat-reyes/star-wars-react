import { request } from "../utils/request";

export function requestPlanetDetails(url, storageData) {
  return request(url, storageData);
}
