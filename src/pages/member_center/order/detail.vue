<script setup lang="ts">
import {reqCancelOrder, reqOrderInfo, reqOrderStatus, reqQRcode} from "@/api/member";
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import {OrderInfoData, QRcodeInfo} from "@/api/member/type.ts";
  import {ElMessage} from "element-plus";
  //@ts-ignore
  import QRCode from 'qrcode'

  const route = useRoute()


  //获取订单详情数据
  const orderInfo = ref<OrderInfoData>({} as OrderInfoData)
  const getOrderInfo =async ()=>{
    const res = await reqOrderInfo(route.query.orderId as string)
    if (res.code===200){
      orderInfo.value = res.data
    }
  }
  onMounted(()=>getOrderInfo())

  //取消订单
  const cancelOrder=async ()=>{
    try {
      await reqCancelOrder(route.query.orderId as string)
      await getOrderInfo()
    }catch (error) {
      ElMessage({
        type:'error',
        message:'取消预约失败',
      })
    }
  }

  //支付弹窗
  const dialogTableVisible = ref(false)

  const closeDialog = ()=>{
    dialogTableVisible.value = false
    //关闭定时器
    clearInterval(timer.value)
    //更新页面
    getOrderInfo()
  }
  const openDialog = ()=>{
    dialogTableVisible.value=true
    getQRcodeInfo()
  }

  //获取支付二维码
  const imgUrl = ref<string>("");
  const timer = ref<any>()
  const getQRcodeInfo =async ()=>{
    const res:QRcodeInfo = await reqQRcode(route.query.orderId as string)
    if (res.code===200){
      imgUrl.value = await QRCode.toDataURL(res.data.codeUrl)
      //查询订单状态 创建定时器
      timer.value = setInterval(async ()=>{
        const res = await reqOrderStatus(route.query.orderId as string)
        if (res.data){
          //支付成功逻辑 1.关闭弹窗
          dialogTableVisible.value=false
          //2.关闭定时器
          clearInterval(timer.value)
          //3.更新页面
          await getOrderInfo()
        }
      },2000)
    }
  }
</script>

<template>
  <div class="detail-order">

    <el-card class="box-card">
      <!--卡片头部-->
      <template #header>
        <div class="card-header">
          <span>挂号详情</span>
        </div>
      </template>
      <!--卡片身体部分-->
      <div class="card-body">

        <el-tag type="success"  effect="dark">
          <div class="tip">
            <svg t="1716456286351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2641" width="16" height="16"><path d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z" fill="#1afa29" p-id="2642"></path></svg>
            <span>{{ orderInfo.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <div class="right">
          <img src="@/assets/images/code_login_wechat.png" alt="">
          <div class="font">
            <p>微信 关注 “北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>

        </div>

      </div>
      <!--卡片尾部-->
      <template #footer>
        <div class="card-bottom">
          <div class="right">
            <el-descriptions class="margin-top" :column="1" border>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊人信息</div>
                </template>
                {{ orderInfo.patientName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊日期</div>
                </template>
                {{ orderInfo.reserveDate }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊医院</div>
                </template>
                {{ orderInfo.hosname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊科室</div>
                </template>
                {{ orderInfo.depname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医生职称</div>
                </template>
                {{ orderInfo.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医事服务费</div>
                </template>
                <span style="color: red">{{ orderInfo.amount }}</span>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号单号</div>
                </template>
                {{ orderInfo.id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号时间</div>
                </template>
                {{ orderInfo.createTime }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="btn" v-if="orderInfo.orderStatus===0||orderInfo.orderStatus===1">
              <el-popconfirm title="是否取消挂号?" @confirm="cancelOrder">
                <template #reference>
                  <el-button>取消预约</el-button>
                </template>
              </el-popconfirm>
              <el-button @click="openDialog" v-if="orderInfo.orderStatus===0" type="primary" size="default">支付</el-button>
            </div>
          </div>
          <div class="left">
            <el-card class="box-card2">
              <template #header>
                <div class="card-header2">
                  <span>注意事项</span>
                </div>
              </template>
              <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
              <p style="color: red">
                2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前
                在医院取号，未取号视为爽约，该号不退不换；
              </p>
              <p>
                3.【退号】在{{ orderInfo.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
              </p>
              <p>
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
              </p>
              <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
            </el-card>
          </div>
        </div>
      </template>
    </el-card>

    <el-dialog @close="closeDialog" v-model="dialogTableVisible" title="微信支付" width="400">
      <div class="dialog-body">
        <img :src="imgUrl" alt="">
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <el-button @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.detail-order{
  .box-card{
    .card-header{
      color: #7f7f7f;
      font-weight: 888;
      font-size: 20px;
    }
    .card-body{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tip{
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          margin-left: 5px;
        }
      }
      .right{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
          height: 40px;
          width: 40px;
        }
        p{
          text-align: center;
          font-size: 12px;
          margin:5px;
        }
      }

    }

    .card-bottom{
      display: flex;
      justify-content: space-between;

      .right{
        flex: 4;
        .btn{
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
        }
      }
      .left{
        margin-left: 20px;
        flex: 6;
        p{
          line-height: 35px;
        }
        .card-header2{
          color: #7f7f7f;
          font-weight: 888;
        }

      }
    }


  }

  .dialog-body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #7f7f7f;
    border-top: 1px solid #7f7f7f;
    height: 250px;

    img{
      width: 130px;
      height: 130px;
    }
    p{
      line-height: 30px;

    }
  }
}

</style>