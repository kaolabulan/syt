<script lang="ts">
export default {
  name:"Search"
}
</script>


<script setup lang="ts">
  import {Search} from '@element-plus/icons-vue';
  import {ref} from "vue";
  import {reqHospitalInfo} from "@/api/home";
  import {HospitalInfo} from "@/api/home/type.ts";

  import {useRouter} from "vue-router";
  const router = useRouter()

  const hosname = ref<string>('')
  const getFetch =async (value:string,cb:any)=>{
    const res:HospitalInfo = await reqHospitalInfo(value)
    const showData = res.data.map(item=>{
      return{
        value:item.hosname,
        hoscode:item.hoscode
      }
    })
    cb(showData)
  }
  //点击推荐项
  const goDetail = (item:any)=>{
    router.push(`/hospital?hoscode=${item.hoscode}`)
  }

</script>

<template>
  <div class="search">
    <el-autocomplete @select="goDetail"
                     :trigger-on-focus="false"
                     :fetch-suggestions="getFetch"
                     clearable placeholder="请输入医院的名称"
                     v-model="hosname"/>
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