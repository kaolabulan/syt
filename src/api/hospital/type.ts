//定义详情模块数据TS类型
export interface ResponseData{
  code:number,
  message:string,
  ok:boolean
}

//代表医院详情数据
export interface HospitalDetailData{
  "bookingRule": {
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
  },
  "hospital": {
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "hostypeString": string,
      "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": null,
    "route": string,
    "status": number,
    "bookingRule": null
  }
}

//医院详情接口返回数据的TS类型
export interface HospitalDetail extends ResponseData{
  data:HospitalDetailData,
}


//医院科室TS类型
export interface DepartmentDataItem {
  "depcode": string,
  "depname": string,
  "children"?: DepartmentDataItem[]
}
export type DepartmentData = DepartmentDataItem[]
export interface Department extends ResponseData{
  data:DepartmentData,
}


//用户登录接口需要携带参数类型
export interface LoginData {
  phone: string,
  code: string
}
//登录接口返回的数据的ts类型
export interface UserInfo{
  name:string,
  token:string
}
export interface UserInfoData extends ResponseData{
  data:UserInfo
}


