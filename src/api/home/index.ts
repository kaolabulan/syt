import request from "@/utils/request.ts";
import type {HospitalResponseData,HospitalLevelAndRegionResponseData} from "@/api/home/type.ts";
//获取分页列表
export const reqGetHospital =(page:number,limit:number,hostype='',districtCode='')=> request.get<any,HospitalResponseData>(`/hosp/hospital/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
//获取医院等级，地址
export const reqLevelAndRegion = (dictCode:string)=>request.get<any,HospitalLevelAndRegionResponseData>(`/cmn/dict/findByDictCode/${dictCode}`)








