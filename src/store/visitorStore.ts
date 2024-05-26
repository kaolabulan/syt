import {defineStore} from "pinia";
import {reqAllUser} from "@/api/member/index.ts";
import {AllUser} from "@/api/member/type.ts";

export const useVisitorStore = defineStore('Visitor',()=>{
  //获取所有就诊人
  const allUserInfo = ref<AllUser>([] as AllUser)
  const getAllUser=async ()=>{
    const res = await reqAllUser()
    console.log(res)
    if (res.code===200){
      allUserInfo.value=res.data
    }
  }

  return{
    allUserInfo,
    getAllUser,
  }
})