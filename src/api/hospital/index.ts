import request from "@/utils/request.ts";
import type {HospitalDetail,Department,LoginData,UserInfoData,HospitalWork} from "@/api/hospital/type.ts";
//医院预约挂号详情
export const reqHospitalRegister = (hoscode:string)=>request.get<any,HospitalDetail>(`/hosp/hospital/${hoscode}`)
//获取医院科室信息
export const reqDepartmentInfo = (hoscode:string)=>request.get<any,Department>(`/hosp/hospital/department/${hoscode}`)

//获取验证码/api/sms/send/{phone}
export const reqSendPhone = (phone:string)=>request.get<any>(`/sms/send/${phone}`)

//用户登录接口
export const reqUserLogin = (data:LoginData) => request.post<any,UserInfoData>('/user/login', data);
//预约挂号的数据
export const reqHospitalWork = (page:number,limit:number,hoscode:string,depcode:string)=>request.get<any,HospitalWork>(`/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`)


