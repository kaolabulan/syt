<script setup lang="ts">
import { CertationArr} from "@/api/member/type.ts";
import {reqAddOrUpdateUser, reqCityInfo, reqRealTs} from "@/api/member/index.ts";
import { ref} from "vue";
import type { CascaderProps } from 'element-plus'
import {useVisitorStore} from "@/store/visitorStore.ts";
import {ElMessage} from "element-plus";
import {useRoute,useRouter} from "vue-router";


const visitorStore = useVisitorStore()
const route = useRoute()
const router = useRouter()
//获取证件类型

const realType = ref<CertationArr>([] as CertationArr)
const getRealType =async ()=>{
  const res = await reqRealTs()
  if (res.code===200){
    realType.value = res.data
  }
}
onMounted(()=>getRealType())

//级联选择器
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node:any, resolve:any) {
    const res = await reqCityInfo(node.data?.id as number||86 )
    const showData = res.data.map((item:any)=>{
      return{
        id:item.id,
        label:item.name,
        value:item.value,
        leaf:!item.hasChildren
      }
    })
    resolve(showData)
  }
}
//收集新增就诊人的数据

//提交按钮
const submit=async ()=>{
  try {
    await reqAddOrUpdateUser(visitorStore.userParams)
    ElMessage({
      type:'success',
      message:visitorStore.userParams.id?'修改成功':'增加成功'
    })
    if (route.query.docId){
      router.back()
    }else {
      visitorStore.changeShow(true)
    }
    //清空数据
    visitorStore.reset()
    //更新所有就诊人
    await visitorStore.getAllUser()

  }catch (error) {
    ElMessage({
      type:'error',
      message:visitorStore.userParams.id?'修改失败':'增加失败'
    })
  }
}

</script>

<template>
  <!-- 添加就诊人|修改已有的就诊人信息的结构 -->
  <div class="form">
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form style="width: 60%; margin: 10px auto">
      <el-form-item label="用户姓名">
        <el-input v-model="visitorStore.userParams.name" placeholder="请你输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="visitorStore.userParams.certificatesType" placeholder="请你选择证件的类型" style="width: 100%">
          <el-option v-for="item in realType" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="visitorStore.userParams.certificatesNo" placeholder="请你输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group  v-model="visitorStore.userParams.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
            v-model="visitorStore.userParams.birthdate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请你选择日期"/>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="visitorStore.userParams.phone" placeholder="请你输入用户手机号码"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>

    <el-form style="width: 60%; margin: 10px auto">
      <el-form-item label="婚姻状况">
        <el-radio-group v-model="visitorStore.userParams.isMarry">
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自费/医保">
        <el-radio-group p v-model="visitorStore.userParams.isInsure">
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前的住址">
        <!--  级联选择器      -->
        <el-cascader v-model="visitorStore.userParams.addressSelected" :props="props" />
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="visitorStore.userParams.address" placeholder="请你输入用户详细地址"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">联系人信息（选填）</el-divider>
    <el-form style="width: 60%; margin: 10px auto" label-width="80">
      <el-form-item label="用户姓名">
        <el-input v-model="visitorStore.userParams.contactsName" placeholder="请你输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="visitorStore.userParams.contactsCertificatesType" placeholder="请你选择证件的类型" style="width: 100%">
          <el-option v-for="item in realType" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="visitorStore.userParams.contactsCertificatesNo" placeholder="请你输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="visitorStore.userParams.contactsPhone" placeholder="请你输入用户手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit">提交</el-button>
        <el-button type="primary" size="default" @click="visitorStore.reset()">重写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>