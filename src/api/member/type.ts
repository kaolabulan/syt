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





