import request from "@/utils/request.ts";
import {OrderData, OrderInfo} from "@/api/member/type.ts";

//创建订单
export const reqOrderId = (hoscode:string,scheduleId:string,patientId:number)=> request.post<any,OrderData>(`/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`)
//获取订单详情
export const reqOrderInfo =(id:string)=>request.get<any,OrderInfo>(`/order/orderInfo/auth/getOrderInfo/${id}`)
//取消订单
export const reqCancelOrder = (orderId:string)=>request.get(`/order/orderInfo/auth/cancelOrder/${orderId}`)




