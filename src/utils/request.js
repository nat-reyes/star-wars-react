import axios from "axios";

/**
 * Axios API request function
 * @param {*} endpoint
 * @param {*} options
 * @param {*} responseFormatter
 * @param {*} errorFormater
 * @returns
 */

export const get = (endpoint, options, responseFormatter) =>
  axios
    .get(endpoint, options)
    .then(responseFormatter || ((response) => response?.data?.data))
    .catch((error) => {
      throw error;
    });
