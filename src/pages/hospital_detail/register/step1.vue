<script setup lang="ts">
  import {reqHospitalWork,reqDoctorWork} from "@/api/hospital";
  import {computed, onMounted, ref} from "vue";
  import {useRoute,useRouter} from "vue-router";
  import {DoctorWorkData, HospitalWork, HospitalWorkData} from "@/api/hospital/type.ts";
  const route = useRoute()
  const router = useRouter()


  //page:number,limit:number,hoscode:string,depcode:string
  const page = ref(1)
  const limit = ref(6)
  const workData = ref<HospitalWorkData>({} as HospitalWorkData)
  const getHospitalWork =async ()=>{
    const res:HospitalWork =await reqHospitalWork(page.value,limit.value,route.query.hoscode as string,route.query.depcode as string)
    workData.value = res.data
    workday.value = workData.value.bookingScheduleList[0].workDate
    await getDoctorWork()
  }
  onMounted(()=>getHospitalWork())
  //点击获取值班日期 发送请求
  const workday = ref('')
  const status = ref(-1)
  const workdayClick = (item:any)=>{
    workday.value = item.workDate
    status.value = item.status
    getDoctorWork()

  }
  //医师排班数据
  const doctorData = ref<DoctorWorkData>([] as DoctorWorkData)
  const getDoctorWork =async ()=>{
    const res = await reqDoctorWork(route.query.hoscode as string,route.query.depcode as string,workday.value)
    doctorData.value = res.data
  }
  //计算 上下午排版数据
  const morningArr = computed(()=>doctorData.value.filter((item)=>item.workTime===0))
  const afternoonArr = computed(()=>doctorData.value.filter((item)=>item.workTime===1))
  //路由跳转 就诊人选择
  const goStep2 = (doc:any)=>{
    router.push({path:'/hospital/step2',query:{docId:doc.id}})
  }
</script>

<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间展示日期的结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div :class="{active: item.status == -1 || item.availableNumber == -1,cur:item.workDate===workday}"
             class="item"
             v-for="(item,index) in workData.bookingScheduleList"
             :key="index"
             @click="workdayClick(item)">
          <div class="top1">{{ item.workDate }}-{{item.dayOfWeek}}</div>
          <div class="bottom">
            <div v-if="item.status===-1">无号</div>
            <div v-if="item.status===0">
              {{ item.availableNumber > 0 ? `有号（${item.availableNumber}）`:'满号' }}
            </div>
            <div v-if="item.status===1">即将放号</div>
          </div>
        </div>
      </div>
      <!--分页器-->
      <el-pagination v-model:current-page="page" layout="prev, pager, next" :total="workData.total" @current-change="getHospitalWork"/>
    </div>
    <!-- 底部展示医生的结构 -->
    <div class="bottom">
      <!-- 无号或满号 -->
      <div class="will" v-if="status===-1||(status===0&&doctorData.length<1)">
        <span class="time">该时间段医生休息或挂号约满</span>
      </div>
      <!-- 展示即将放号的时间 -->
      <div class="will" v-else-if="status===1">
        <span class="time">2023年6月3日08:30</span>
        <span class="willText">放号</span>
      </div>
      <!-- 展示医生的结构:上午、下午 -->
      <div class="doctor" v-else-if="status===0">
        <!-- 上午 -->
        <div class="moring">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg
                t="1685757781400"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1631"
                width="32"
                height="32"
            >
              <path
                  d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                  fill="#1296db"
                  p-id="1632"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!--每一个医生的信息-->
          <div class="doc_info" v-for="doc in morningArr" :key="doc.id">
            <!-- 展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doc.title }}</span>
                <span>|</span>
                <span>{{ doc.docname }}</span>
              </div>
              <div class="skill">{{ doc.skill }}</div>
            </div>
            <!-- 右侧区域展示挂号的钱数-->
            <div class="right">
              <div class="money">￥{{doc.amount}}</div>
              <el-button @click="goStep2(doc)" type="primary" size="default">剩余{{doc.availableNumber}}</el-button>
            </div>
          </div>
        </div>
        <!-- 下午 -->
        <div class="moring">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg
                t="1685758544953"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2423"
                width="32"
                height="32"
            >
              <path
                  d="M356.9664 562.7392H762.88a61.44 61.44 0 0 1 61.44 61.44v153.6H295.7824v-153.6a61.44 61.44 0 0 1 61.184-61.44z"
                  fill="#FFAECF"
                  p-id="2424"
              ></path>
              <path
                  d="M431.872 383.6416h256a61.44 61.44 0 0 1 61.44 61.44v117.76H370.6368v-117.76a61.44 61.44 0 0 1 61.2352-61.44z"
                  fill="#FFAECF"
                  p-id="2425"
              ></path>
              <path
                  d="M945.152 831.5392H78.848a15.36 15.36 0 0 1 0-30.72h866.304a15.36 15.36 0 0 1 0 30.72z"
                  fill="#8E5178"
                  p-id="2426"
              ></path>
              <path
                  d="M661.1456 998.4H362.8544a15.36 15.36 0 0 1-15.36-15.36v-35.0208a32.9728 32.9728 0 0 1 32.9216-32.9216 82.3808 82.3808 0 0 0 82.2784-82.2784v-16.384a15.36 15.36 0 0 1 15.36-15.36h67.8912a15.36 15.36 0 0 1 15.36 15.36v16.384a82.3808 82.3808 0 0 0 82.2784 82.2784 32.9728 32.9728 0 0 1 32.9216 32.9216V983.04a15.36 15.36 0 0 1-15.36 15.36z m-282.9312-30.72h267.5712v-19.6608a2.2016 2.2016 0 0 0-2.2016-2.2016 113.1008 113.1008 0 0 1-112.9984-112.9984v-1.024h-37.1712v1.024a113.1008 113.1008 0 0 1-112.9984 112.7424 2.2016 2.2016 0 0 0-2.2016 2.2016z"
                  fill="#8E5178"
                  p-id="2427"
              ></path>
              <path
                  d="M776.0384 831.5392H247.9616a15.36 15.36 0 0 1-15.36-15.36v-153.6a76.8 76.8 0 0 1 76.8-76.8h405.6064a76.8 76.8 0 0 1 76.8 76.8v153.6a15.36 15.36 0 0 1-15.7696 15.36z m-512.7168-30.72h497.3568v-138.24a46.08 46.08 0 0 0-46.08-46.08H309.1968a46.08 46.08 0 0 0-46.08 46.08z"
                  fill="#8E5178"
                  p-id="2428"
              ></path>
              <path
                  d="M701.1328 616.5504H322.8672a15.36 15.36 0 0 1-15.36-15.36v-117.76a76.8 76.8 0 0 1 76.8-76.8h256a76.8 76.8 0 0 1 76.8 76.8v117.76a15.36 15.36 0 0 1-15.9744 15.36z m-362.9056-30.72h347.5456v-102.4a46.08 46.08 0 0 0-46.08-46.08H384a46.08 46.08 0 0 0-46.08 46.08z"
                  fill="#8E5178"
                  p-id="2429"
              ></path>
              <path
                  d="M641.3312 437.4528H382.6688a15.36 15.36 0 0 1-15.36-15.36V336.2304a76.8 76.8 0 0 1 76.8-76.8h136.192a76.8 76.8 0 0 1 76.8 76.8v85.8624a15.36 15.36 0 0 1-15.7696 15.36z m-243.3024-30.72h227.9424V336.2304a46.08 46.08 0 0 0-46.08-46.08H443.904a46.08 46.08 0 0 0-46.08 46.08z"
                  fill="#8E5178"
                  p-id="2430"
              ></path>
              <path
                  d="M845.5168 831.5392H178.4832a15.36 15.36 0 0 1-15.36-15.36V374.7328a348.8768 348.8768 0 0 1 697.7536 0v441.4464a15.36 15.36 0 0 1-15.36 15.36z m-651.6736-30.72h636.3136V374.7328a318.1568 318.1568 0 0 0-636.3136 0z"
                  fill="#8E5178"
                  p-id="2431"
              ></path>
              <path
                  d="M512 290.3552a15.36 15.36 0 0 1-10.24-3.6352c-2.1504-1.8944-53.504-46.6432-74.6496-77.5168a69.5808 69.5808 0 0 1-5.9392-71.68 58.368 58.368 0 0 1 52.5824-31.1296 51.2 51.2 0 0 1 38.0416 15.36 51.2 51.2 0 0 1 38.0416-15.36 58.2144 58.2144 0 0 1 52.5312 31.1296 69.4272 69.4272 0 0 1-5.888 71.68c-21.1456 30.72-72.4992 75.6224-74.6496 77.5168a15.36 15.36 0 0 1-9.8304 3.6352z m-38.0416-153.2416a27.392 27.392 0 0 0-25.6 14.7456 38.9632 38.9632 0 0 0 4.096 39.8848c13.6704 19.968 43.6736 48.3328 59.392 62.6688 15.7184-14.336 45.7216-42.7008 59.392-62.6688a38.9632 38.9632 0 0 0 4.096-39.8848 27.392 27.392 0 0 0-25.6-14.7456 22.9376 22.9376 0 0 0-22.9888 18.8416 15.36 15.36 0 0 1-15.36 12.2368 15.36 15.36 0 0 1-14.9504-12.4416 22.8864 22.8864 0 0 0-22.4768-18.6368zM600.576 537.1392a44.9536 44.9536 0 0 1-32.5632-14.1312c-5.12-4.6592-6.9632-6.144-11.8784-6.144s-6.7584 1.4848-11.8272 6.144a44.5952 44.5952 0 0 1-65.1264 0c-5.12-4.6592-6.9632-6.144-11.8784-6.144s-6.7584 1.4848-11.8272 6.144a44.5952 44.5952 0 0 1-65.1264 0c-5.12-4.6592-6.9632-6.144-11.8784-6.144a15.36 15.36 0 0 1 0-30.72 44.9536 44.9536 0 0 1 32.5632 14.1312c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8272-6.144a44.5952 44.5952 0 0 1 65.1264 0c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8272-6.144a44.5952 44.5952 0 0 1 65.1264 0c5.12 4.6592 6.9632 6.144 11.8784 6.144s6.7584-1.4848 11.8784-6.144A44.8512 44.8512 0 0 1 645.12 486.4a15.36 15.36 0 0 1 0 30.72c-5.12 0-6.7584 1.4848-11.8784 6.144a44.8512 44.8512 0 0 1-32.6656 13.8752z"
                  fill="#8E5178"
                  p-id="2432"
              ></path>
            </svg>
            <span class="text">下午号源</span>
          </div>
          <!--每一个医生的信息-->
          <div class="doc_info" v-for="doc in afternoonArr" :key="doc.id">
            <!-- 展示医生的名字|技能 -->
            <div class="left">
              <div class="info">
                <span>{{ doc.title }}</span>
                <span>|</span>
                <span>{{ doc.docname }}</span>
              </div>
              <div class="skill">{{ doc.skill }}</div>
            </div>
            <!-- 右侧区域展示挂号的钱数-->
            <div class="right">
              <div class="money">￥{{doc.amount}}</div>
              <el-button @click="goStep2(doc)" type="primary" size="default">剩余{{doc.availableNumber}}</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 5px;
      height: 20px;
      background: skyblue;
      margin: 0px 5px;
    }
    .dot {
      margin: 0px 5px;
      color: skyblue;
    }
  }
  .center {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 900;
    }
    .container {
      width: 100%;
      display: flex;
      margin: 30px 0px;
      .item {
        flex: 1;
        width: 100%;
        border: 1px solid skyblue;
        margin: 0px 10px;
        transition: all 0.3s;
        &.active {
          border: 1px solid #ccc;
          color: #7f7f7f;
          .top1 {
            background: #ccc;
          }
        }

        &.cur {
          transform: scale(1.1);
        }
        .top1 {
          background: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
      .item:hover{
        cursor: pointer;
      }
    }
  }
  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      .time {
        color: red;
      }
      .willText {
        color: skyblue;
      }
    }
    .doctor {
      .moring {
        .tip {
          display: flex;
          align-items: center;
          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 10px 0px;
          border-bottom: 1px solid #ccc;
          .left {
            .info {
              color: skyblue;
              margin: 10px 0px;
              span {
                margin: 0px 5px;
                font-size: 18px;
                font-weight: 900;
              }
            }
            .skill {
              margin: 10px 0px;
              color: #7f7f7f;
            }
          }
          .right {
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money {
              color: #7f7f7f;
              font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>