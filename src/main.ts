import { createApp } from 'vue'
import App from '@/App.vue'
//引入清除默认样式
import "@/style/reset.scss"
//引入全局组件
import HospitalTop from "@/components/hospital_top/index.vue"
import HospitalBottom from "@/components/hospital_bottom/index.vue"
import Login from "@/components/login/index.vue"
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
//引入vue-router
import router from "@/router";
//引入pinia
//引入pinia仓库
import pinia from '@/store'

const app = createApp(App)
//引入顶部全局组件
app.component("HospitalTop",HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)
//安装vue-router
app.use(router)
app.use(pinia)
//引入路由鉴权的文件
import '@/permisstion.ts'
//挂载
app.mount('#app')
