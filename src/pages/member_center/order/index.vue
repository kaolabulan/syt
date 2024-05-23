<script setup lang="ts">
import {useRoute} from "vue-router";
import DetailOrder from "@/pages/member_center/order/detail.vue";
import AllOrder from "@/pages/member_center/order/all.vue";
const route = useRoute()
</script>

<template>
  <div>
    <div v-if="route.query.orderId">
      <DetailOrder/>
    </div>

    <div v-else>
      <AllOrder/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>