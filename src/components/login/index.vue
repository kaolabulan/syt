<script setup lang="ts">
  import {useUserStore} from "@/store/userStore.ts";
  //引入图标
  import { User, Lock } from "@element-plus/icons-vue";
  import {reactive, ref, computed,} from "vue";
  import {reqSendPhone} from "@/api/hospital";
  import CountDown from "@/components/countdown/index.vue"
  import { ElMessage } from "element-plus";
  import {useRouter,useRoute} from "vue-router";

  const userStore = useUserStore()
  const route=useRoute()
  const router=useRouter()
  //切换登录
  const loginType = ref<boolean>(true)
  const changeScene=()=>{
    loginType.value = !loginType.value
  }
  //登录输入
  const loginParams = reactive({
    phone:'17720125002',
    code:'',
  })
  //计算输入是否合法
  //计算出当前表单元素收集的内容是否手机号码格式
  let isPhone = computed(() => {
    //手机号码正则表达式
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    //返回布尔值:真代表手机号码、假代表的即为不是手机号码
    return reg.test(loginParams.phone);
  });

  //获取验证码 发请求
  const getCode =async ()=>{
    const res:any = await reqSendPhone(loginParams.phone)
    if (res.code===200){
      loginParams.code=res.data
    }
    flag.value = false
  }

  //验证码倒计时控制
  const flag = ref<boolean>(true)
  const flagChange = (value:boolean)=>{
    flag.value = value
  }

  //发送登录请求
  const getUserInfo =async ()=>{
    await formRef.value.validate()
    try {
      await userStore.getUserLogin(loginParams)
      userStore.dialogVisible=false
    }catch (error) {
      ElMessage({
        type: "error",
        message: (error as Error).message,
      });
    }

    if (route.query.redirect){
      await router.push(route.query.redirect as string)
    }
  }
  //获取form组件实例
  const formRef = ref()
  //自定义校验规则
  const validatorPhone = (rule: any, value: any, callBack: any) => {
    //rule:即为表单校验规则对象
    //value:即为当前文本的内容
    //callBack:回调函数
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if (reg.test(value)) {
      callBack();
    } else {
      callBack(new Error("请输入正确的手机号码格式"));
    }
  }
  const validatorCode = (rule: any, value: any, callBack: any)=>{
    if (/^\d{6}$/.test(value)) {
      callBack()
  } else {
    callBack(new Error("请输入正确的验证码格式"))
  }
  }
  //表单校验规则
  const rules = {
    phone:[{trigger:'change',validator:validatorPhone}],
    code:[{trigger:'change',validator:validatorCode}],

  }

//关闭登录窗口清空数据
  const close = ()=>{
    Object.assign(loginParams,{phone:'17720125002',code:''})
    formRef.value.resetFields()
  }
  const closeDialog = ()=>{
    userStore.dialogVisible=false
    close()
  }

</script>
<script lang="ts">
export default {
  name:'login'
}
</script>
<template>
  <div class="login_content">
    <el-dialog v-model="userStore.dialogVisible" title="用户登录" @close="close">
      <div class="content">
        <!-- 对话框身体部分 -->
        <el-row>
          <el-col :span="12">
            <div v-show="loginType" class="left">
              <el-form :rules="rules" ref="formRef" :model="loginParams">
                <el-form-item prop="phone">
                  <el-input v-model="loginParams.phone" :prefix-icon="User" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input v-model="loginParams.code" :prefix-icon="Lock" placeholder="请输入手机验证码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="getCode" :disabled="!isPhone||!flag">
                    <span v-if="flag">获取验证码</span>
                    <CountDown v-else :flag="flag" @flagChange="flagChange"/>
                  </el-button>
                </el-form-item>
                <el-button @click="getUserInfo" :disabled="!isPhone||loginParams.code?.length!==6" type="primary" size="default" style="width: 100%">用户登录</el-button>
                <div class="bottom" @click="changeScene">

                    <p>微信扫码登录</p>
                    <svg t="1715603466523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4324" width="32" height="32"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="4325"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#28C445" p-id="4326"></path></svg>

                </div>
              </el-form>
            </div>
            <div v-show="!loginType" class="webchat">
              微信扫码登录结构
              <el-button @click="changeScene" type="primary" size="default">手机号登录</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right">
              <div class="top">
                <div class="item">
                  <img src="@/assets/images/code_login_wechat.png" alt="">
                  <svg t="1715603466523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4324" width="16" height="16"><path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#8a8a8a" p-id="4325"></path><path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z" fill="#8a8a8a" p-id="4326"></path></svg>
                  <p>微信扫一扫关注</p>
                  <p>“快速预约挂号”</p>
                </div>
                <div class="item">
                  <img src="@/assets/images/code_login_wechat.png" alt="">
                  <svg
                      t="1685263518283"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3668"
                      width="16"
                      height="16"
                  >
                    <path
                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                        fill="#000000"
                        p-id="3669"
                    ></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>“预约挂号”APP</p>
                </div>
              </div>
              <p class="tip">官方指定平台</p>
              <p class="tip">快速挂号，安全放心</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.login_content{
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .content{
    margin: 20px 0;
    .left{
      border: 1px solid #ccc;
      padding: 20px;

      .bottom{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
          margin: 10px 0;
        }
      }
    }

    .right{
      margin-left: 10px;
      .top{
        display: flex;
        justify-content: space-between;

        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 130px;
            height: 130px;
          }
          p{
            margin: 5px 0;
          }
        }
      }

      .tip{
        text-align: center;
        margin: 10px 0 ;
        font-size: 20px;
        font-weight: 888;
      }
    }
  }


}
</style>