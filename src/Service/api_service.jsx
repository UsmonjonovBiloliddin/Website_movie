import axios from "./api";
const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};
const Api_Service = {
  getData: async (url) => {
    const data = await axios.get(url, options);
    return data.data;
  },
};

export default Api_Service;
