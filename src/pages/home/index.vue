<script setup lang="ts">
import Carousel from '@/pages/home/carousel/index.vue'
import Search from  './search/index.vue'
import Level from  './level/index.vue'
import Region from './region/index.vue'
import Card from  './card/index.vue'
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
        <Level/>
        <!-- 地区分类组件-->
        <Region/>
        <!-- 卡片组件-->
        <div class="hospital">
          <Card class="item" v-for="item in 10" :key="item"/>
        </div>
        <!--分页器 -->
        <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </el-col>

      <!--右侧  -->
      <el-col :span="4">
        456
      </el-col>

    </el-row>
  </div>
</template>

<style scoped lang="scss">
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