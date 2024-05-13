import request from "@/utils/request.ts";
import type {HospitalDetail,Department} from "@/api/hospital/type.ts";
//医院预约挂号详情
export const reqHospitalRegister = (hoscode:string)=>request.get<any,HospitalDetail>(`/hosp/hospital/${hoscode}`)
//获取医院科室信息
export const reqDepartmentInfo = (hoscode:string)=>request.get<any,Department>(`/hosp/hospital/department/${hoscode}`)



