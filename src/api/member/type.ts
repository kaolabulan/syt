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