<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="tip">确认挂号信息</div>
    <!--展示就诊人信息的卡片  -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
    <!--展示医生信息的卡片  -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
  </div>

</template>

<style scoped lang="scss">
.container{
  .tip{
    font-size: 20px;
    font-weight: 888;
    color: #7f7f7f;
  }
  .box-card{
    width: 100%;
    margin: 30px 0;
  }
}
</style>