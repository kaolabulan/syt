<script setup lang="ts">
import {User} from "@element-plus/icons-vue";
import {useVisitorStore} from "@/store/visitorStore.ts";
import Visitor from "@/pages/hospital_detail/register/visitor.vue";
import AlterVisitor from "@/pages/member_center/patient/alterVisitor.vue";
//获取就诊人仓库
const visitorStore = useVisitorStore()

onMounted(()=>visitorStore.getAllUser())
</script>

<template>
  <div class="manage-patient">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>就诊人管理</span>
          <el-button type="primary" size="default" :icon="User">添加就诊人</el-button>
        </div>
      </template>

      <div class="card-body" v-if="!visitorStore.showManage">
        <!-- 就诊人显示-->
        <Visitor class="item" v-for="p in visitorStore.allUserInfo" :key="p.id" :visitor-item="p"/>
      </div>

      <div class="alter-body" v-if="visitorStore.showManage">
        <!-- 就诊人信息修改，添加-->
        <AlterVisitor/>
      </div>


    </el-card>
  </div>
</template>

<style scoped lang="scss">
.manage-patient{
  .box-card{
    .card-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-body{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 30%;
        margin: 15px 10px;
      }
    }
  }
}
</style>