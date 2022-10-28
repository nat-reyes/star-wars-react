import { request } from "../utils/request";

export function requestCharacters(storageData, params, setLoading) {
  return request(
    "https://swapi.dev/api/people",
    storageData,
    params,
    setLoading
  );
}
