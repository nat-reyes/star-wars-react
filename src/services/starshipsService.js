import { request } from "../utils/request";
import { stringify } from "query-string";

export function requestStarshipDetails(url, storageData, params, characterId) {
  fetch(`${url}?${stringify(params)}`)
    .then((response) => response?.json())
    .then((data) => {
      storageData(data, { characterId });
    });
}
