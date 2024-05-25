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
    <el-form ref="formRef" v-if=true :model="formData" :rules="rules"
             style="width: 60%; margin: 20px auto" label-width="80">
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select v-model="formData.certificatesType" style="width: 100%" placeholder="请选择证件类型">
          <el-option :label="item.name" :value="item.value" v-for="item in realType" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input v-model="formData.certificatesNo" placeholder="请输入证件号码"></el-input>
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
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
            :on-success="successhandler"
            :on-exceed="exceedhandler">
          <img
              style="width: 100%; height: 100%"
              src="../../../assets/images/auth_example.png"
              alt=""/>

        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
              w-full
              v-if="formData.certificatesUrl"
              style="width: 100%; height: 100%"
              :src="formData.certificatesUrl"
              alt="Preview Image"/>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary" size="default">提交</el-button>
        <el-button @click="reset" type="primary" size="default">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {InfoFilled,} from "@element-plus/icons-vue";
import {reqRealName, reqRealTs, reqUserCertation} from "@/api/member";
import {ref, onMounted, reactive} from "vue";
import {CertationArr, UserInfo, UserParams} from "@/api/member/type.ts";
import {ElMessage} from "element-plus";


//获取实名信息
const realName = ref<UserInfo>({} as UserInfo)
const getRealName =async ()=>{
  const res = await reqRealName()
  if (res.code===200){
    realName.value = res.data
  }
}
onMounted(()=>getRealName())

//获取证件类型
const realType = ref<CertationArr>([] as CertationArr)
const getRealType =async ()=>{
  const res = await reqRealTs()
  if (res.code===200){
    realType.value = res.data
  }
}
onMounted(()=>getRealType())

//表单数据
const formData = reactive<UserParams>({
  "certificatesNo": '',
  "certificatesType": '',
  "certificatesUrl": '',
  "name": '',
})
//超出数量的钩子
const exceedhandler = () => {
  ElMessage({
    type: "error",
    message: "图片只能上传一张图片",
  });
};
//图品上传成功的钩子
const successhandler = (response: any) => {
  // //如果图片上传成功校验结果清除
  formRef.value.clearValidate('certificatesUrl');

  //收集上传成功图片地址
  //response:上传图片请求服务器返回的数据
  //uploadFile上传文件对象
  formData.certificatesUrl = response.data;

};

//照片墙预览的钩子
const dialogVisible = ref<boolean>(false)
const handlePictureCardPreview = () => {
  //触发预览的钩子的时候，对话框显示
  dialogVisible.value = true;
};

//找皮墙删除图片的钩子
const handleRemove = () => {
  formData.certificatesUrl = "";
};
//重写按钮
const upload = ref()
const reset = ()=>{
  upload.value.clearFiles()
  Object.assign(formData,{
    "certificatesNo": '',
    "certificatesType": '',
    "certificatesUrl": '',
    "name": '',
  })
}
//提交按钮
const submit =async ()=>{
  await formRef.value.validate()
  try {
    await reqUserCertation(formData)
    ElMessage({
      type:'success',
      message:'认证成功'
    })
  }catch (error) {
    ElMessage({
      type:'error',
      message:'认证失败'
    })
  }
}
//自定义校验规则
const validatorName=(rule:any,value:any,callback:any)=>{
  let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
  if (reg.test(value)){
    callback()
  }else {
    callback(new Error('请输入正确的名字'))
  }
}
const validatorType=(rule:any,value:any,callback:any)=>{
  if (value==='10'||value==='20'){
    callback()
  }else {
    callback(new Error('请选择正确的证件类型'))
  }
}
const validatorNo=(rule:any,value:any,callback:any)=>{
  let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  let hkb = /^\d{9}$/;
  if (sfz.test(value)||hkb.test(value)){
    callback()
  }else {
    callback(new Error('请输入正确的证件号码'))
  }
}
const validatorUrl=(rule:any,value:any,callback:any)=>{
  if (value.length){
    callback()
  }else {
    callback(new Error('请上传证件照'))
  }
}
//表单校验规则
// { required: true, message: 'Please input Activity name', trigger: 'blur' },
//  pass: [{ validator: validatePass, trigger: 'blur' }],
const rules = {
  name:[{required:true,validator:validatorName,trigger:'change'}],
  certificatesType:[{required:true,validator:validatorType,trigger:'change'}],
  certificatesNo:[{required:true,validator:validatorNo,trigger:'change'}],
  certificatesUrl:[{required:true,validator:validatorUrl,trigger:'change'}],

}
const formRef = ref()
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
