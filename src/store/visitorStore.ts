import {defineStore} from "pinia";
import {reqAllUser} from "@/api/member/index.ts";
import {AddOrUpdateUser, AllUser} from "@/api/member/type.ts";

export const useVisitorStore = defineStore('Visitor',()=>{
  //获取所有就诊人
  const allUserInfo = ref<AllUser>([] as AllUser)
  const showManage = ref<boolean>(true)
  const changeShow=(value:boolean)=>{
    showManage.value=value
  }
  const getAllUser=async ()=>{
    const res = await reqAllUser()
    if (res.code===200){
      allUserInfo.value=res.data
    }
  }
  //要收集就诊人的数据
  const userParams = reactive<AddOrUpdateUser>({
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 1,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
  //重构收集的就诊人数据
  const reset=(params?:AddOrUpdateUser)=>{
    if (!params){
      Object.assign(userParams,{
        name: "",
        certificatesType: "",
        certificatesNo: "",
        sex: 1,
        birthdate: "",
        phone: "",
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: "",
        contactsName: "",
        contactsCertificatesType: "",
        contactsCertificatesNo: "",
        contactsPhone: "",
      })
    }else{
      Object.assign(userParams,params)
    }
  }

  return{
    allUserInfo,
    showManage,
    userParams,
    getAllUser,
    reset,
    changeShow,
  }
})