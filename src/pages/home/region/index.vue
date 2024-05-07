<script setup lang="ts">

</script>

<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul class="sort">
        <li class="active">全部</li>
        <li>青山湖区</li>
        <li>青山湖区</li>
        <li>青山湖区</li>
        <li>青山湖区</li>
        <li>青山湖区</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  display: flex;
  .left{
    color: #7f7f7f;
  }
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
</style>