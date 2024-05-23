<script setup lang="ts">
import {useRoute} from "vue-router";
const route = useRoute()
</script>

<template>
  <div>
    <div v-if="route.query.orderId">订单详情</div>

    <div v-else>全部订单</div>
  </div>
</template>

<style scoped lang="scss">

</style>