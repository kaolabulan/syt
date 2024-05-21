<script setup lang="ts">
import {User} from "@element-plus/icons-vue";
import Visitor from "@/pages/hospital_detail/register/visitor.vue";

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
        <Visitor v-for="o in 4" :key="o" class="item"></Visitor>
      </div>
    </el-card>
    <!--展示医生信息的卡片  -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>

      <el-descriptions
          class="margin-top"
          :column="3"
          border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊日期：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊医院：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              就诊科室：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生姓名：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生职务：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              医生专长：
            </div>
          </template>
          *****
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              费用：
            </div>
          </template>
          *****
        </el-descriptions-item>



      </el-descriptions>

    </el-card>
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
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .item {
        width: 30%;
        margin: 15px 0;
      }
    }
  }
}
</style>