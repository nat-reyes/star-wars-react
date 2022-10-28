import { request } from "../utils/request";

export function requestStarshipDetails(url, storageData) {
  return request(url, storageData);
}
