import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
  history:createWebHistory(),
  routes:[
    {
      path: '/home',
      //路由懒加载
      component: () => import('@/pages/home/index.vue')
    },
    {
      path:'/detail',
      component:()=>import('@/pages/hospital_detail/index.vue')
    },
    //重定向
    {
      path:'/',
      redirect:'/home'
    }

  ],
  //滚动行为 控制滚动条位置
  scrollBehavior(){
    return{
      left:0,
      top:0,
    }
  }
})