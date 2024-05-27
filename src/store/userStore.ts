import {defineStore} from "pinia";
import {ref} from "vue";
import {LoginData} from "@/api/hospital/type.ts";
import {reqUserLogin} from "@/api/hospital";

export const useUserStore = defineStore('User',()=>{
  const dialogVisible = ref<boolean>(false)
  const userInfo =  ref(JSON.parse(localStorage.getItem('USERINFO') as string)||{name:'',token:''})

  //登录业务
  const getUserLogin =async (data:LoginData)=>{
    const res = await reqUserLogin(data)
    console.log(res)
    if (res.code===200){
      userInfo.value=res.data
      //数据本地持久化
      localStorage.setItem('USERINFO',JSON.stringify(userInfo.value))
      return 'ok'
    }else {
      return Promise.reject(new Error(res.message));
    }
  }
  //退出登录
  const logout = ()=>{
    //清除用户数据
    userInfo.value={name:'',token:''}
    //清除localStorage数据
    localStorage.removeItem('USERINFO')
  }

  return{
    dialogVisible,
    userInfo,
    getUserLogin,
    logout,
  }
})