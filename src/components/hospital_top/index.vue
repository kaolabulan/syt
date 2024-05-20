<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/userStore.ts";

const router = useRouter()
const userStore = useUserStore()
const goHome = ()=>{
  router.push('/home')
}

//登录
const login = ()=>{
  userStore.dialogVisible = true
}
//退出登录
const logout = ()=>{
  userStore.logout()
  //路由跳转至首页
  goHome()
}

</script>

<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="@/assets/images/logo.png" alt="">
        <p>预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.userInfo.token">登录/注册</p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item >挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .top{
    //fixed 定位 元素的位置相对于浏览器窗口是固定位置
    position: fixed;
    z-index: 888;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;

    .content{
      width: 1200px;
      height: 70px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left{
        cursor: pointer;
        img{
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        p{
          font-size: 22px;
          color: skyblue;
        }
        display: flex;
        justify-content: center;
        align-items: center;

      }
      .right{
        p{
          font-size: 16px;
          color: #bbb;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        .help{
          margin-right: 10px;
        }
      }
    }
  }
</style>