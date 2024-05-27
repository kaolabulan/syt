<template>
  <div class="container">
    <HospitalTop/>
    <div class="content">
      <el-config-provider :locale="locale">
        <router-view/>

      </el-config-provider>
    </div>
    <HospitalBottom/>
    <Login v-if="useStore.dialogVisible"/>
  </div>
</template>

<script setup lang="ts">
import locale from "element-plus/es/locale/lang/zh-cn";
import {useUserStore} from "@/store/userStore.ts";
const useStore = useUserStore()

</script>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
      margin-top: 70px;
      width: 1200px;
      min-height: 700px;
    }

  }
</style>