<script setup lang="ts">
import {ref} from "vue";
import {reqAllOrder, reqAllUser, reqOrderState} from "@/api/member";
import {AllUser, RecordsItem} from "@/api/member/type.ts";
import {useRouter} from "vue-router";
const router = useRouter()

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const patientId = ref<string>("")
const orderStatus = ref<string>("")
const total = ref<number>(0)
//获取所有订单数据
const allOrderInfo = ref<RecordsItem[]>([] as RecordsItem[])
const getAllOrder =async ()=>{
  const res = await reqAllOrder(pageNo.value,pageSize.value,patientId.value,orderStatus.value)
  if (res.code===200){
    allOrderInfo.value=res.data.records
    total.value=res.data.total
  }
}
onMounted(()=>{
  getAllOrder()
  getAllUser()
  getOrderState()
})
const sizeChange=(size)=>{
  pageSize.value=size
  getAllOrder()
}
const pageChange=(page)=>{
  pageNo.value=page
  getAllOrder()
}
//跳转详情
const goDetail=(row)=>{
  router.push({path:'/member/order',query:{orderId:row.id}})
}
//获取就诊人和订单状态数据
const allUserArr = ref<AllUser>([] as AllUser)
const getAllUser=async ()=>{
  const res = await reqAllUser()
  if (res.code===200){
    allUserArr.value=res.data
  }
}
const orderStateArr=ref([])
const getOrderState=async ()=>{
  const res = await reqOrderState()
  if (res.code===200){
    orderStateArr.value=res.data
  }
}
</script>

<template>
  <div class="all-order">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>
      <div class="box-body">
        <!--  下拉选择框 -->
        <el-form  :inline="true">
          <el-form-item label="就诊人选择">
            <el-select @change="getAllOrder" v-model="patientId" placeholder="所有就诊人" style="width: 200px">
              <el-option label="所有就诊人" value=""></el-option>
              <el-option v-for="item in allUserArr" :key="item.id" :label="item.name" :value="item.id"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select @change="getAllOrder" v-model="orderStatus" placeholder="全部订单" style="width: 200px">
              <el-option label="全部订单" value=""></el-option>
              <el-option :label="item.comment" :value="item.status" v-for="(item,index) in orderStateArr" :key="index"></el-option>

            </el-select>
          </el-form-item>
        </el-form>

        <el-table :data="allOrderInfo">
          <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
          <el-table-column label="医院" prop="hosname"></el-table-column>
          <el-table-column label="科室" prop="depname"></el-table-column>
          <el-table-column label="医生" prop="title"></el-table-column>
          <el-table-column label="服务费" prop="amount"></el-table-column>
          <el-table-column label="就诊人" prop="patientName"></el-table-column>
          <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="text" @click="goDetail(row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <template #footer>
        <!-- 分页器-->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout=" prev, pager, next, jumper ->, sizes,total,"
            :total="total"
            @size-change="sizeChange"
            @current-change="pageChange"
        />
      </template>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.all-order{
  .box-card{
    width: 100%;
    .card-header{
      font-size: 20px;
    }
  }
}
</style>