import {defineStore} from "pinia";
import {reqHospitalRegister} from "@/api/hospital";
import {ref} from "vue";
import {HospitalDetailData} from "@/api/hospital/type.ts";

export const useHospitalDetailStore = defineStore('hospitalDetailStore',()=>{
  const hospitalInfo = ref<HospitalDetailData>({} as HospitalDetailData)
  const getHospitalRegister =async (hoscode:string)=>{
    const result = await reqHospitalRegister(hoscode)
    console.log(result)
    if (result.code===200){
      hospitalInfo.value = result.data
    }
  }


  return{
    hospitalInfo,
    getHospitalRegister,
  }
})