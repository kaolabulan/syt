<script setup lang="ts">
import {Search} from '@element-plus/icons-vue';
</script>

<template>
  <div class="search">
    <el-autocomplete  clearable placeholder="请输入医院的名称"/>
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>

</template>

<style scoped lang="scss">

.search{
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>