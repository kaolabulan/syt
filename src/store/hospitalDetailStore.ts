import {defineStore} from "pinia";
import {reqDepartmentInfo, reqHospitalRegister} from "@/api/hospital";
import {ref} from "vue";
import {Department, DepartmentData, HospitalDetailData} from "@/api/hospital/type.ts";

export const useHospitalDetailStore = defineStore('hospitalDetailStore',()=>{
  const hospitalInfo = ref<HospitalDetailData>({} as HospitalDetailData)
  const getHospitalRegister =async (hoscode:string)=>{
    const result = await reqHospitalRegister(hoscode)
    if (result.code===200){
      hospitalInfo.value = result.data
    }
  }

//获取医院科室信息
  const departmentInfo = ref<DepartmentData>([] as DepartmentData)
  const getDepartmentInfo =async (hoscode:string)=>{
    const res:Department = await reqDepartmentInfo(hoscode)
    console.log(res)
    if (res.code===200){
      departmentInfo.value = res.data
    }
  }

  return{
    hospitalInfo,
    departmentInfo,
    getHospitalRegister,
    getDepartmentInfo
  }
})