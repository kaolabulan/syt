<script setup lang="ts">

</script>

<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="title">等级：</div>
      <ul class="sort">
        <li class="active">全部</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.level{
  color: #7f7f7f;
  h1{
    font-size: 20px;
    font-weight: 900;
  }
  .content{
    display: flex;
    margin: 10px 0;
    .sort{
      display: flex;
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