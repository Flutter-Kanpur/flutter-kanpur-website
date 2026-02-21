// import axios from "axios"

// export const fetchDataFromApi = async ({ url, params }) => {
//     try {
//         if (!params) {
//             throw new Error("Missing required parameters");
//         }
//         const result = await axios.get(url, { params });
//         if (result.status !== 200) {
//             throw new Error("Failed to fetch data from API " + url + " with status " + result.status);
//         } else {
//             return result;
//         }
//     } catch (error) {
//         throw new Error("Error fetching data from API: " + error.message);
//     }
// }

import axios from "axios";

export const fetchDataFromApi = async ({ url, params, method = "GET", data, headers }) => {
  try {
    const config = {
      url,
      method,
      params,
      data,
      headers
    };
    const result = await axios(config);
    return result;
  } catch (error) {
    console.error("API Error detailed:", error.response?.data || error.message);
    throw error;
  }
};
