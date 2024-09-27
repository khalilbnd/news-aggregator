/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";



const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// // Add a request interceptor
// instance.interceptors.request.use(async (config) => {
//   try {
//     let userInfo: any = await AsyncStorage.getItem("userInfo");
  
//     // Check if token
//     if (userInfo ) {
      
      
//       userInfo = JSON.parse(userInfo);
//       const decoded: any = JWT.decode(userInfo.token, JWT_SECRET);
      
//       config.headers.authorization = `Bearer ${userInfo.token}`;
      
//     }
//   } catch (error: any) {
//     if(error.message == "Token has expired"){
//       await AsyncStorage.removeItem("userInfo");
//     }else{
//       console.error("Error retrieving user info:", error);
//     }
//   }
//   return config;
// });

// // Add a response interceptor
// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Return the response if it's successful
//     return response;
//   },
//   (error) => {
//     // Log or handle the error
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       Toast.show(t(error.response.data.message, selectedLanguage), {type: 'danger'});
//       console.log(error);
      
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("No response received:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Request failed:", error.message);
//     }
//     // Return a rejected promise with the error
//     return Promise.reject(error);
//   }
// );

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: any, headers?: any) => instance.post(url, body, headers).then(responseBody),
  put: (url: string, body: any) => instance.put(url, body).then(responseBody),
};

