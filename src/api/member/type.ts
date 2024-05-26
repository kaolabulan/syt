//定义通用返回数据模块
export interface ResponseData{
  "code": number,
  "message": string,
  "ok": boolean
}

//创建订单TS类型
export interface OrderData extends ResponseData{
  data:number
}

//订单详情TS类型
export interface OrderInfoData{
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "orderStatusString": string
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": string,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}
export interface OrderInfo extends ResponseData{
  data:OrderInfoData
}

//支付二维码TS类型
export interface QRcodeData{
  "codeUrl": string,
  "orderId": number,
  "totalFee": number,
  "resultCode": string
}
export interface QRcodeInfo extends ResponseData{
  data:QRcodeData
}

//支付状态TS类型
export interface OrderStatus extends ResponseData{
  data:boolean
}

//代表一个用户信息的数据类型
export interface UserInfo {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
  },
  "openid": null,
  "nickName": null,
  "phone": string,
  "name": string,
  "certificatesType": string,
  "certificatesNo": string,
  "certificatesUrl": null,
  "authStatus": number,
  "status": number
}

//获取用户信息接口返回的数据的ts类型
export interface UseringoResponseData extends ResponseData {
  data: UserInfo
}
//代表证件类型的数据ts
export interface CertationType {
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {

  },
  "parentId": number,
  "name": string,
  "value": string,
  "dictCode": string,
  "hasChildren": boolean
}
export type CertationArr = CertationType[];
export interface CertationTypeResponseData extends ResponseData {
  data: CertationArr
}
//用户认证的携带的参数的ts类型
export interface UserParams {
  "certificatesNo": string,
  "certificatesType": string,
  "certificatesUrl": string,
  "name": string
}
//所有订单TS类型
export interface RecordsItem{
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {
    "orderStatusString": string
  },
  "userId": number,
  "outTradeNo": string,
  "hoscode": string,
  "hosname": string,
  "depcode": string,
  "depname": string,
  "scheduleId": null,
  "title": string,
  "reserveDate": string,
  "reserveTime": number,
  "patientId": number,
  "patientName": string,
  "patientPhone": string,
  "hosRecordId": string,
  "number": number,
  "fetchTime": string,
  "fetchAddress": string,
  "amount": number,
  "quitTime": string,
  "orderStatus": number
}
export interface OrderAllData{
  "records": RecordsItem[],
  "total": number,
  "size": number,
  "current": number,
  "orders": [

  ],
  "hitCount": boolean,
  "searchCount": boolean,
  "pages": number
}
export interface OrderAll extends ResponseData{
  data:OrderAllData
}

//代表就诊人ts类型
export interface User {
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
  "name": string,
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
//全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的ts类型
export interface AllUserResponseData extends ResponseData {
  data: AllUser
}

//订单状态ts类型
export interface OrderState {
  "comment": string,
  "status": number
}

export type AllOrderState = OrderState[];
//全部订单状态码接口返回的数据ts类型
export interface AllOrderStateResponseData extends ResponseData {
  data: AllOrderState
}
//城市下拉单数据TS
export interface CityItem{
  "id": number,
  "createTime": string,
  "updateTime": string,
  "isDeleted": number,
  "param": {},
  "parentId": number,
  "name": string,
  "value": string,
  "dictCode": null,
  "hasChildren": true
}
export type CityData = CityItem[]
export interface CityInfo extends ResponseData{
  data:CityData
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
  id?: string,
  name: string,
  certificatesType: string,
  certificatesNo:string,
  sex:number,
  birthdate:string,
  phone:string,
  isMarry:number,
  isInsure:number,
  addressSelected:string[],
  address:string,
  contactsName:string,
  contactsCertificatesType:string,
  contactsCertificatesNo:string,
  contactsPhone:string
}
