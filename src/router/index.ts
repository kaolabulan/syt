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
      path:'/hospital',
      component:()=>import('@/pages/hospital_detail/index.vue'),
      children:[
        {
          path:'',
          component:()=>import('@/pages/hospital_detail/register/index.vue')
        },
        {
          path:'detail',
          component:()=>import('@/pages/hospital_detail/detail/index.vue')
        },
        {
          path:'notice',
          component:()=>import('@/pages/hospital_detail/notice/index.vue')
        },
        {
          path:'close',
          component:()=>import('@/pages/hospital_detail/close/index.vue')
        },
        {
          path:'search',
          component:()=>import('@/pages/hospital_detail/search/index.vue')
        },
        {
          path:'step1',
          component:()=>import('@/pages/hospital_detail/register/step1.vue')
        },
        {
          path:'step2',
          component:()=>import('@/pages/hospital_detail/register/step2.vue')
        },

      ]
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