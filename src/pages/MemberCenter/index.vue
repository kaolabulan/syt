<script setup lang="ts">
import {Document, Menu as IconMenu, Warning, Setting,Search,HomeFilled} from '@element-plus/icons-vue'


const changeActive = ()=>{

}
</script>
<script lang="ts">
  export default {
    name:'MemberCenter'
  }
</script>
<template>
  <div class="hos_detail">
    <!-- 左侧导航区-->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span>/ 会员中心</span>
      </div>
      <el-menu  class="el-menu-vertical-demo">
        <el-menu-item @click="changeActive('/hospital')" index="/hospital">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item @click="changeActive('/hospital/detail')" index="/hospital/detail">
          <el-icon>
            <document/>
          </el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item @click="changeActive('/hospital/notice')" index="/hospital/notice">
          <el-icon><Warning /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item @click="changeActive('/hospital/close')" index="/hospital/close">
          <el-icon>
            <setting/>
          </el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item @click="changeActive('/hospital/search')" index="/hospital/search">
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>

    </div>
    <!-- 右侧展示区-->
    <div class="content">
      <router-view></router-view>

    </div>
  </div>
</template>

<style scoped lang="scss">
.hos_detail {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
      color: #7f7f7f;
      font-weight: 888;
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  .content {
    flex: 8;
    margin-top: 50px;
  }
}
</style>