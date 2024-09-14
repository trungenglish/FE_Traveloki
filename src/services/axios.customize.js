//interceptor
import axios from 'axios';
import NProgress from "nprogress";

//NProgress là thư viện giúp tạo hiệu ứng loading khi chuyển trang
NProgress.configure({ 
    showSpinner: false, 
    trickleSpeed: 100,
  });

//set config defaults when creating an instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

//Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN; 

// instance.interceptors.request.use(function (config) {
//     NProgress.start();
//     // Do something before request is sent
//     if (typeof window !== "undefined" && window && window.localStorage &&
//       window.localStorage.getItem('access_token')) {
//       // lấy token từ local storage và gán vào header
//       // Bearer là định dạng để truyền data
//       config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
//     }
//     return config;
//   }, function (error) {
//     NProgress.done();
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     NProgress.done();
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     //lược bỏ response.data.data nếu không cần thiết để trả về đơn giản hơn
//     if (response.data && response.data.data)
//         return response.data;
//     return response;
//   }, function (error) {
//     NProgress.done();
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     //khi có lỗi thì trả ra data từ backend gửi lên
//     if (error.response && error.response.data) {
//       return error.response.data;
//     } 
//     return Promise.reject(error);
//   });
export default instance;