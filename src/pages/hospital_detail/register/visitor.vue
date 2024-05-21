<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">{{ visitorItem.isInsure===1?'医保':'自费' }}</span>
        <span class="username">{{ visitorItem.name }}</span>
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
      <p>证件类型: {{visitorItem.param.certificatesTypeString}}</p>
      <p>证件号码: {{visitorItem.certificatesNo}}</p>
      <p>用户性别: {{visitorItem.sex===1?'男':'女'}}</p>
      <p>出生日期：{{visitorItem.birthdate}}</p>
      <p>手机号码：{{visitorItem.phone}}</p>
      <p>婚姻状况: {{visitorItem.isMarry===1?'已婚':'未婚'}}</p>
      <p>当前住址: {{visitorItem.param.cityString}}</p>
      <p>详细地址：{{visitorItem.param.fullAddress}}</p>
      <p>{{visitorItem.id}}--{{clickId}}--{{isClick}}</p>
      <!-- 红色的已经选择的盒子 -->
      <transition name="confirm">
        <div class="confirm" v-if="isClick">已选择</div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {EditPen, User} from "@element-plus/icons-vue";
import {computed} from "vue";
const props = defineProps(['visitorItem','clickId'])
const isClick = computed(()=>props.visitorItem.id===props.clickId)

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
    padding: 20px;
    position: relative;
    p {
      line-height: 40px;
    }
    .confirm{
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border: 1px dashed red;
      border-radius: 50%;
      font-size: 25px;
      font-weight: 888;
      line-height: 200px;
      text-align: center;
      top: 20%;
      left: 38px;
      opacity: 0.5;
      transform: rotate(35deg);
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
