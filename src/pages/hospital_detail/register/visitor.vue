<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">医保</span>
        <span class="username">考拉</span>
      </div>
      <div class="right">

        <el-button circle type="primary" size="default" :icon="EditPen"></el-button>

        <el-popconfirm :title="`你确定要删除`" width="200px">
          <template #reference>
            <el-button circle type="danger" size="default" :icon="User"></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型:</p>
      <p>证件号码:</p>
      <p>用户性别:</p>
      <p>出生日期：</p>
      <p>手机号码：</p>
      <p>婚姻状况:</p>
      <p>当前住址</p>
      <p>详细地址：</p>
      <!-- 红色的已经选择的盒子 -->
<!--      <transition name="confirm">-->
<!--        <div class="confirm" v-if="index === currentIndex">已选择</div>-->
<!--      </transition>-->
    </div>
  </div>
</template>

<script setup lang="ts">

import {EditPen, User} from "@element-plus/icons-vue";

</script>

<style scoped lang="scss">
.visitor {
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 10px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 20px;
    p {
      line-height: 40px;
    }
    .confirm {
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      line-height: 200px;
      left: 20%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
    }

    .confirm-enter-from {
      transform: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.3s;
    }

    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>
