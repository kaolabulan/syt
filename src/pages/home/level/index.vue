<script setup lang="ts">
  import {reqLevelAndRegion} from "@/api/home";
  import { onMounted, ref} from "vue";

  import type {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type.ts";
  const emit = defineEmits(['getLevel'])
  const levelArr = ref<HospitalLevelAndRegionArr>([])
  const getLevel =async ()=>{
    const result:HospitalLevelAndRegionResponseData =await reqLevelAndRegion("HosType")
    if (result.code===200){
      levelArr.value = result.data
    }

  }
  onMounted(()=>getLevel())

  //active切换
  const activeValue = ref<string>('')
  const activeClick = (value:string)=>{
    activeValue.value = value
    emit('getLevel',value)
  }

</script>

<template>
  <div class="level">
    <div class="content">
      <div class="title">等级：</div>
      <ul class="sort">
        <li :class="{active:activeValue===''}" @click="activeClick('')">全部</li>
        <li :class="{active:activeValue===item.value}"
            @click="activeClick(item.value)"
            v-for="item in levelArr"
            :key="item.value">{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.level{
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