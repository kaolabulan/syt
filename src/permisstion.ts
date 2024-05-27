//路由鉴权
//引入路由器
import router from "@/router";
//引入进度条

import NProgress from "nprogress"
import 'nprogress/nprogress.css'
//引入pinia仓库
import pinia from '@/store'

import {useUserStore} from "@/store/userStore.ts";
const userStore = useUserStore(pinia)

NProgress.configure({ showSpinner: false });

let whiteList = ["/home", '/hospital', '/hospital/detail', '/hospital/notice', '/hospital/close', '/hospital/search'];

//前置守卫
router.beforeEach((to,from,next)=>{
  NProgress.start();
  document.title=`${to.meta.title}`
  //登录鉴权
  const token = userStore.userInfo.token
  if(token){
    next()
  }else {
    //未登录状态
    if (whiteList.includes(to.path)){
      next()
    }else {
      next({path:'/home',query:{redirect:to.fullPath}})
      userStore.dialogVisible=true
    }
  }
})

//后置路由
router.afterEach((to,from)=>{
  NProgress.done();
})

