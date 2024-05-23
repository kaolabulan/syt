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
    {
      path: '/member',
      //路由懒加载
      component: () => import('@/pages/member_center/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/member_center/certification/index.vue'),
          meta:{
            title:'实名认证'
          }
        },
        {
          path: 'order',
          component: () => import('@/pages/member_center/order/index.vue'),
          meta:{
            title:'挂号订单'
          }
        },
        {
          path: 'patient',
          component: () => import('@/pages/member_center/patient/index.vue'),
          meta:{
            title:'就诊人管理'
          }
        },
        {
          path: 'profile',
          component: () => import('@/pages/member_center/profile/index.vue'),
          meta:{
            title:'账号信息'
          }
        },
        {
          path: 'feedback',
          component: () => import('@/pages/member_center/feedback/index.vue'),
          meta:{
            title:'信息反馈'
          }
        },
        //重定向
        {
          path:'/member',
          redirect:'/member/certification'
        }
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