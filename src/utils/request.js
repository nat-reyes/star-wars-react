import { stringify } from "query-string";

export function request(url, storageData, params, setLoading = () => {}) {
  fetch(`${url}?${stringify(params)}`)
    .then((response) => response?.json())
    .then((data) => {
      storageData(data);
      setLoading(false);
    });
}
