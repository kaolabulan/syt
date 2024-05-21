//定义详情模块数据TS类型
import {reqVisitor} from "@/api/hospital/index.ts";

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

//预约挂号数据TS类型
export interface baseMap{
  "workDateString": string,
  "releaseTime": string,
  "bigname": string,
  "stopTime": string,
  "depname": string,
  "hosname": string
}
export type bookingScheduleList = bookingScheduleItem[]

export interface bookingScheduleItem{
  "workDate": string,
  "workDateMd": string,
  "dayOfWeek": string,
  "docCount": number,
  "reservedNumber": number,
  "availableNumber": number,
  "status": number
}

export interface HospitalWorkData{
    "total": number,
    "bookingScheduleList": bookingScheduleList,
    "baseMap": baseMap
}
export interface HospitalWork extends ResponseData{
  "data":HospitalWorkData
}

//医师排班数据TS类型
export interface DoctorWorkItem{
  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "dayOfWeek": string,
    "depname": string,
    "hosname": string
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": string,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": string
}
export type DoctorWorkData = DoctorWorkItem[]
export interface DoctorWork extends ResponseData{
  "data":DoctorWorkData
}



//代表的是一个就诊人数据ts类型
export interface VisitorItem {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "certificatesTypeString": string,
    "contactsCertificatesTypeString": string,
    "cityString": null,
    "fullAddress": string,
    "districtString": null,
    "provinceString": null
  },
  "userId": number,
  "name": number,
  "certificatesType": string,
  "certificatesNo": string,
  "sex": number,
  "birthdate": string,
  "phone": string,
  "isMarry": number,
  "provinceCode": null,
  "cityCode": null,
  "districtCode": null,
  "address": string,
  "contactsName": string,
  "contactsCertificatesType": string,
  "contactsCertificatesNo": string,
  "contactsPhone": string,
  "isInsure": number,
  "cardNo": null,
  "status": string
}
export type VisitorData = VisitorItem[];
export interface UserResponseData extends ResponseData {
  data: VisitorData
}

//排班挂号医生ID数据TS类型
export interface IdInfoData {
  "id": string,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "dayOfWeek": string,
    "depname": string,
    "hosname": string
  },
  "hoscode": string,
  "depcode": string,
  "title": string,
  "docname": string,
  "skill": string,
  "workDate": string,
  "workTime": number,
  "reservedNumber": number,
  "availableNumber": number,
  "amount": number,
  "status": number,
  "hosScheduleId": string
}
export interface IdInfo extends ResponseData{
  data:IdInfoData
}



