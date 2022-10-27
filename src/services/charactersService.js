/* eslint-disable prettier/prettier */
import { get } from "../utils/request";

export function requestCharacters(storageData) {
  fetch("https://swapi.dev/api/people")
    .then((response) => response?.json())
    .then((data) => storageData(data?.results));
}

