import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
  history:createWebHistory(),
  routes:[
    {
      path: '/home',
      //路由懒加载
      component: () => import('@/pages/home/index.vue'),
      meta:{
        title:'首页'
      }
    },
    {
      path:'/hospital',
      component:()=>import('@/pages/hospital_detail/index.vue'),
      children:[
        {
          path:'',
          component:()=>import('@/pages/hospital_detail/register/index.vue'),
          meta:{
            title:'预约挂号'
          }
        },
        {
          path:'detail',
          component:()=>import('@/pages/hospital_detail/detail/index.vue'),
          meta:{
            title:'医院详情'
          }
        },
        {
          path:'notice',
          component:()=>import('@/pages/hospital_detail/notice/index.vue'),
          meta:{
            title:'预约通知'
          }
        },
        {
          path:'close',
          component:()=>import('@/pages/hospital_detail/close/index.vue'),
          meta:{
            title:'停诊信息'
          }
        },
        {
          path:'search',
          component:()=>import('@/pages/hospital_detail/search/index.vue'),
          meta:{
            title:'查询'
          }
        },
        {
          path:'step1',
          component:()=>import('@/pages/hospital_detail/register/step1.vue'),
          meta:{
            title:'挂号步骤1'
          }
        },
        {
          path:'step2',
          component:()=>import('@/pages/hospital_detail/register/step2.vue'),
          meta:{
            title:'挂号步骤2'
          }
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