import axios from "axios";
import {useUserStore} from "@/store/userStore.ts";

const request = axios.create({
  baseURL:'/api',
  timeout:5000
})

//请求拦截器
request.interceptors.request.use((config)=>{
  //携带登录token
  const userStore = useUserStore()
  if (userStore.userInfo.token){
    config.headers.token = userStore.userInfo.token
  }
  return config
});

//响应拦截器
request.interceptors.response.use((response)=>{

  return response.data
},(error)=>{
  //处理http网络错误

  return Promise.reject(new Error(error.message))
})

export default request

