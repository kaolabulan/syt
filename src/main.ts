import { createApp } from 'vue'
import App from '@/App.vue'
//引入清除默认样式
import "@/style/reset.scss"
//引入全局组件
import HospitalTop from "@/components/hospital_top/index.vue"
import HospitalBottom from "@/components/hospital_bottom/index.vue"

const app = createApp(App)
//引入顶部全局组件
app.component("HospitalTop",HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.mount('#app')
