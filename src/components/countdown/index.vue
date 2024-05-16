<template>
  <div>
    <span>获取验证码({{time}}s)</span>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps(['flag'])
const emit = defineEmits(['flagChange'])
//倒计时
const time = ref<number>(5)
watch(()=>props.flag,()=>{
  const timer = setInterval(()=>{
    time.value--
    if (time.value===0){
      clearInterval(timer)
      //结束展示 子传父更改flag
      emit('flagChange',true)
    }
  },1000)
},{immediate:true})

</script>

<style scoped></style>
