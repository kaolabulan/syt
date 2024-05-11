import request from "@/utils/request.ts";
import type {HospitalDetail} from "@/api/hospital/type.ts";
//医院预约挂号详情
export const reqHospitalRegister = (hoscode:string)=>request.get<any,HospitalDetail>(`/api/hosp/hospital/${hoscode}`)



