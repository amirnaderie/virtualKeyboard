import axios from "axios";
//import auth from "./authService";

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   config.headers.Authorization = token ? token : "";
//   return config;
// });


// const getrefreshToken = async () => {
//   const param= {refreshToken: localStorage.getItem("refreshToken")}
//   const res =axios.post(`${process.env.REACT_APP_URL}/auth/refresh`, param);
//   return res;
// };

// axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await getrefreshToken();
          
//           const { token,refreshToken } = rs.data;
//           // window.localStorage.setItem("accessToken", accessToken);
//           // instance.defaults.headers.common["x-access-token"] = accessToken;
//           localStorage.setItem("token", token);
//           localStorage.setItem("refreshToken", refreshToken);
//           originalConfig.headers["Authorization"] = token;
         
//           return axios(originalConfig);
//         } catch (_error) {
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }
//           return Promise.reject(_error);
//         }
//       }
//       if (err.response.status === 403 && err.response.data) {
//                 // return Promise.reject(err.response.data);
//             auth.logout();
//             window.location = "/login";
//       }
//     }
//     return Promise.reject(err);
//   }
// );


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt
};
