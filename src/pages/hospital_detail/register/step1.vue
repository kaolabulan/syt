<script setup lang="ts">
  import {reqHospitalWork} from "@/api/hospital";
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import {HospitalWork, HospitalWorkData} from "@/api/hospital/type.ts";
  const route = useRoute()


  //page:number,limit:number,hoscode:string,depcode:string
  const page = ref(1)
  const limit = ref(6)
  const workData = ref<HospitalWorkData>({} as HospitalWorkData)
  const getHospitalWork =async ()=>{
    const res:HospitalWork =await reqHospitalWork(page.value,limit.value,route.query.hoscode as string,route.query.depcode as string)
    workData.value = res.data
  }
  onMounted(()=>getHospitalWork())
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
        <div :class="{active: item.status == -1 || item.availableNumber == -1 }"
             class="item"
             v-for="(item,index) in workData.bookingScheduleList"
             :key="index">
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