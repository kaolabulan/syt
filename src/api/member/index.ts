import request from "@/utils/request.ts";
import {
  AddOrUpdateUser,
  AllOrderStateResponseData,
  AllUserResponseData,
  CertationTypeResponseData, CityInfo, OrderAll,
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
//获取所有订单数据
export const reqAllOrder = (page:number,limit:number,patientId:string,orderStatus:string)=>request.get<any,OrderAll>(`/order/orderInfo/auth/${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
//获取全部就诊人的信息
export const reqAllUser = () => request.get<any, AllUserResponseData>('/user/patient/auth/findAll');
//获取全部订单的接口
export const reqOrderState = () => request.get<any, AllOrderStateResponseData>('/order/orderInfo/auth/getStatusList');
//获取地址下拉数据
export const reqCityInfo =(parentId:number)=> request.get<any,CityInfo>(`/cmn/dict/findByParentId/${parentId}`)
//新增与修改已有的就诊人接口方法
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
  if (data.id) {
    return request.put<any, any>('/user/patient/auth/update', data);
  } else {
    return request.post<any, any>('/user/patient/auth/save', data);
  }
}

//删除某一个就诊人的信息
export const reqRemoveUser = (id:number)=>request.delete<any,any>(`/user/patient/auth/remove/${id}`)



