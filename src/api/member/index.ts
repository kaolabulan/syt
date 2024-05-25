import request from "@/utils/request.ts";
import {
  CertationTypeResponseData,
  OrderData,
  OrderInfo,
  OrderStatus,
  QRcodeInfo,
  UseringoResponseData, UserParams
} from "@/api/member/type.ts";

//创建订单
export const reqOrderId = (hoscode:string,scheduleId:string,patientId:number)=> request.post<any,OrderData>(`/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`)
//获取订单详情
export const reqOrderInfo =(id:string)=>request.get<any,OrderInfo>(`/order/orderInfo/auth/getOrderInfo/${id}`)
//取消订单
export const reqCancelOrder = (orderId:string)=>request.get(`/order/orderInfo/auth/cancelOrder/${orderId}`)
//获取支付二维码
export const reqQRcode = (orderId:string)=>request.get<any,QRcodeInfo>(`/order/weixin/createNative/${orderId}`)
//获取支付状态
export const reqOrderStatus = (orderId:string)=>request.get<any,OrderStatus>(`/order/weixin/queryPayStatus/${orderId}`)
//获取实名认证信息
export const reqRealName = ()=>request.get<any,UseringoResponseData>('/user/auth/getUserInfo')
//认证类型数据
export const reqRealTs = (dictCode = 'CertificatesType')=>request.get<any,CertationTypeResponseData>(`/cmn/dict/findByDictCode/${dictCode}`)
//用户认证接口
export const reqUserCertation =(data:UserParams)=> request.post<any,any>('/api/user/auth/userAuah',data)



