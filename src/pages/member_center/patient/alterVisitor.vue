<script setup lang="ts">

</script>

<template>
  <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
  <div class="form">
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form style="width: 60%; margin: 10px auto">
      <el-form-item label="用户姓名">
        <el-input placeholder="请你输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select
            placeholder="请你选择证件的类型"
            style="width: 100%">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input
            placeholder="请你输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请你选择日期"/>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
            placeholder="请你输入用户手机号码"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>

    <el-form style="width: 60%; margin: 10px auto">
      <el-form-item label="婚姻状况">
        <el-radio-group>
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自费/医保">
        <el-radio-group>
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前的住址">
        <el-cascader/>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input placeholder="请你输入用户详细地址"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">联系人信息（选填）</el-divider>
    <el-form style="width: 60%; margin: 10px auto" label-width="80">
      <el-form-item label="用户姓名">
        <el-input placeholder="请你输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select placeholder="请你选择证件的类型" style="width: 100%">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input placeholder="请你输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请你输入用户手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">提交</el-button>
        <el-button type="primary" size="default">重写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>