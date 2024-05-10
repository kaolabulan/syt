<script setup lang="ts">
  import {reqLevelAndRegion} from "@/api/home";
  import { onMounted, ref} from "vue";
  import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type.ts";


  const emit = defineEmits(['getRegion'])
  const regionArr = ref<HospitalLevelAndRegionArr>([])
  const getRegion =async ()=>{
    const result:HospitalLevelAndRegionResponseData = await reqLevelAndRegion('Beijin')
    if (result.code===200){
      regionArr.value = result.data
    }
  }
  onMounted(()=>getRegion())

  const activeValue = ref('')
  const activeClick = (value:string)=>{
    activeValue.value = value
    emit('getRegion',value)
  }

</script>

<template>
  <div class="region">
    <div class="content">
      <div class="title">地区：</div>
      <ul class="sort">
        <li :class="{active:activeValue===''}" @click="activeClick('')">全部</li>
        <li :class="{active:activeValue===item.value}" @click="activeClick(item.value)" v-for="item in regionArr" :key="item.value">{{item.name}}</li>

      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.region{
  color: #7f7f7f;
  .content{
    display: flex;
    margin-bottom: 10px;
    .title{
      width: 60px;
    }
    .sort{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: 10px;
        &.active{
          color: #55a6fe;
        }
      }
      li:hover{
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>