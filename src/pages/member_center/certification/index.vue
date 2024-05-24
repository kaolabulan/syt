<template>
  <!-- 实名认证组件的结构 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <!-- 实名认证结构的提示部分 -->
    <div class="tip" style="color: #7f7f7f">
      <p>
        <el-icon><InfoFilled /></el-icon
        >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <!-- 卡片身体的底部:认证成功的结构、认证未成功的结构 -->
    <el-descriptions v-if=true size="small" class="margin-top" :column="1" border style="margin: 20px auto">
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">用户姓名</div>
        </template>
        {{ realName.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">证件类型</div>
        </template>
        {{ realName.certificatesType==='10'?'身份证':'户口本' }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" width="20px">
        <template #label>
          <div class="cell-item">证件号码</div>
        </template>
        {{ realName.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 用户未验证的结构 -->
    <el-form
        v-if=true
        style="width: 60%; margin: 20px auto"
        label-width="80"
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select style="width: 100%" placeholder="请选择证件类型">
          <el-option value="身份证"></el-option>
          <el-option value="户口本"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <!-- action:upload组件向服务器提交图片路径
             limit:照片墙约束图片个数
             on-exceed:超出约束数量的钩子
        -->
        <el-upload
            ref="upload"
            list-type="picture-card"
            :limit="1"
            action="/api/oss/file/fileUpload?fileHost=userAuah"
        >
          <img
              style="width: 100%; height: 100%"
              src="../../../assets/images/auth_example.png"
              alt=""
          />
        </el-upload>

        <el-dialog>
          <img
              w-full

              style="width: 100%; height: 100%"
              src="@/assets/images/auth_example.png"
              alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">提交</el-button>
        <el-button type="primary" size="default">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {InfoFilled} from "@element-plus/icons-vue";
import {reqRealName} from "@/api/member";
import {ref,onMounted} from "vue";
import {UserInfo} from "@/api/member/type.ts";

//获取实名信息
const realName = ref<UserInfo>({} as UserInfo)
const getRealName =async ()=>{
  const res = await reqRealName()
  console.log(res)
  if (res.code===200){
    realName.value = res.data
  }
}
onMounted(()=>getRealName())

</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
