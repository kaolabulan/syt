<script setup lang="ts">

</script>

<template>
  <div class="top">
    <div class="content">
      <div class="left">
        <img src="@/assets/images/logo.png" alt="">
        <p>预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login">登录/注册</p>
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