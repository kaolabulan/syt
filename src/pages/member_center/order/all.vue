<script setup lang="ts">

import {ref} from "vue";

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
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
            <el-select placeholder="请选择就诊人" style="width: 200px">
              <el-option label="张三"></el-option>
              <el-option label="李四"></el-option>
              <el-option label="王五"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select placeholder="请选择订单状态" style="width: 200px">
              <el-option label="全部订单"></el-option>
              <el-option label="已支付"></el-option>
              <el-option label="待支付"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-table>
          <el-table-column label="就诊时间"></el-table-column>
          <el-table-column label="医院"></el-table-column>
          <el-table-column label="科室"></el-table-column>
          <el-table-column label="医生"></el-table-column>
          <el-table-column label="服务费"></el-table-column>
          <el-table-column label="就诊人"></el-table-column>
          <el-table-column label="订单状态"></el-table-column>
          <el-table-column label="操作"></el-table-column>
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
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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