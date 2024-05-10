<script setup lang="ts">
  import Carousel from '@/pages/home/carousel/index.vue'
  import Search from  './search/index.vue'
  import Level from  './level/index.vue'
  import Region from './region/index.vue'
  import Card from  './card/index.vue'
  import Tip from './tip/index.vue'

  import type {Content,HospitalResponseData} from "@/api/home/type.ts";
  //引入请求
  import {reqGetHospital} from "@/api/home";
  import {onMounted, ref} from "vue";
  import {useRouter} from "vue-router";
  const router = useRouter()
  //分页器页码
  const pageNo = ref<number>(1)
  //每页几条数据
  const pageSize = ref<number>(10)
  //存储医院数据
  const hospitalArr = ref<Content>([])
  const total = ref<number>(0)
  //存储医院级别和地区
  const hostype = ref<string>('')
  const districtCode = ref<string>('')
  const getHospitalInfo =async ()=>{
    const result:HospitalResponseData = await reqGetHospital(pageNo.value,pageSize.value,hostype.value,districtCode.value)
    if (result.code===200){
      hospitalArr.value = result.data.content
      total.value = result.data.totalElements
    }
  }
  onMounted(()=>getHospitalInfo())

  //分页器current-page 或 page-size 更改时触发
  const paginationChange = ()=>{
    getHospitalInfo()
  }

  //自定义事件 子传父
  const getLevel = (level:string)=>{
    hostype.value = level
    getHospitalInfo()
  }
  const getRegion = (region:string)=>{
    districtCode.value = region
    getHospitalInfo()
  }

  const goDetail = ()=>{
    router.push('/detail')
  }
</script>

<template>
  <div>
    <!--轮播图-->
    <Carousel/>
    <!-- 搜索框-->
    <Search/>
<!--    底部展示医院结构-->
    <el-row gutter="20">

      <!--左侧  -->
      <el-col :span="20">
        <!-- 等级分类组件-->
        <h1 class="title">医院</h1>
        <Level @getLevel="getLevel"/>
        <!-- 地区分类组件-->
        <Region @getRegion="getRegion"/>
        <!-- 卡片组件-->
        <div @click="goDetail" class="hospital" v-if="hospitalArr.length>0">
          <Card class="item" v-for="(item,index) in hospitalArr" :key="index" :hospitalInfo="item"/>
        </div>
        <el-empty v-else description="没有医院的信息"/>
        <!--分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout=" prev, pager, next, jumper,->,sizes,total,"
            :total="total"
            @change="paginationChange"
        />
      </el-col>

      <!--右侧  -->
      <el-col :span="4">
        <Tip/>
      </el-col>

    </el-row>
  </div>
</template>

<style scoped lang="scss">
.title{
  color: #7f7f7f;
  font-size: 20px;
  font-weight: 900;

}
.hospital{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 48%;
    margin: 10px 0;
  }
  .item:hover{
    cursor: pointer;
  }

}
</style>