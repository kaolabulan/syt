<template>
  <div class="container">
    <HospitalTop/>
    <div class="content">
      中间显示区域
    </div>
    <HospitalBottom/>
    <div>12344</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content{

    }
  }
</style>