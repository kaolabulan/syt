<script setup lang="ts">
import {User} from "@element-plus/icons-vue";
import Visitor from "@/pages/hospital_detail/register/visitor.vue";
import {reqDoctorIdInfo, reqVisitor} from "@/api/hospital";
import {onMounted, ref} from "vue";
import {IdInfoData, VisitorData} from "@/api/hospital/type.ts";
import {useRoute,useRouter} from "vue-router";
import {reqOrderId} from "@/api/member";
import {OrderData} from "@/api/member/type.ts";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()
//就诊人数据
const visitorInfo = ref<VisitorData>({} as VisitorData)
const getVisitor =async ()=>{
  const res =await reqVisitor()
  visitorInfo.value = res.data
}
onMounted(()=>getVisitor())
//挂号医师数据
const doctorInfo = ref<IdInfoData>({} as IdInfoData)
const getDoctorWorking =async ()=>{
  const res = await reqDoctorIdInfo(route.query.docId as string)
  doctorInfo.value = res.data
}
onMounted(()=>getDoctorWorking())

//点击存储标志
const clickId = ref()
const activeClick = (people:any)=>{
  clickId.value = people.id
}
//确认挂号提交
const goOrder =async ()=>{
  //获取订单号
  const res:OrderData = await reqOrderId(doctorInfo.value.hoscode,doctorInfo.value.id,clickId.value)
  if (res.code===200){
    //进行路由跳转
    await router.push({path:'/member/order',query:{orderId:res.data}})
  }else {
    ElMessage({
      type:"error",
      message:res.message
    })
  }

}
</script>

<template>
  <div class="container">
    <div class="tip">确认挂号信息</div>
    <!--展示就诊人信息的卡片  -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人信息</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>
      <div class="user">
        <Visitor :clickId="clickId"  @click="activeClick(p)" :visitorItem="p"  v-for="p in visitorInfo" :key="p.id" class="item"></Visitor>
      </div>
    </el-card>
    <!--展示医生信息的卡片  -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>

      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊日期：
            </div>
          </template>
          {{doctorInfo.workDate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊医院：
            </div>
          </template>
          {{ doctorInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊科室：
            </div>
          </template>
          {{ doctorInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生姓名：
            </div>
          </template>
          {{ doctorInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生职务：
            </div>
          </template>
          {{ doctorInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生专长：
            </div>
          </template>
          {{ doctorInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              费用：
            </div>
          </template>
          {{ doctorInfo.amount}}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>
    <!--提交按钮    -->
    <div class="btn">
      <el-button @click="goOrder" type="primary" size="default" :disabled="clickId===undefined">确认挂号</el-button>

    </div>
  </div>

</template>

<style scoped lang="scss">
.container {
  .tip {
    font-size: 20px;
    font-weight: 888;
    color: #7f7f7f;
  }

  .box-card {
    width: 100%;
    margin: 30px 0;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 30%;
        margin: 15px 10px;
      }
    }
  }

  .btn{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>