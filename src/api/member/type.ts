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


