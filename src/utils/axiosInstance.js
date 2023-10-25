import axios from "axios";

const authToken = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
  headers: { Authorization: `Bearer ${authToken}` },
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        localStorage.clear();
        return Promise.reject(error);
      }

      // forbidden (permission related issues)
      case 403: {
        // router.push({ name: "Home" });
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);
export default axiosInstance;
