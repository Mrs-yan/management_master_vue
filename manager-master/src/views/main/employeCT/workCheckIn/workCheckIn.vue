<template>
  <div class="container">
    <div class="checkIn" v-if="isCheckIn">
      <el-card class="box-card" shadow="hover" style="width: 300px">
        <!-- <div class="imageContainer" @click=""> -->
        <el-image
          :src="isCheckIn ? imageUrlFalse : imageUrlTrue"
          fit="cover"
          @click="handleView"
        ></el-image>
        <!-- </div> -->
      </el-card>
    </div>
    <div class="right" v-else>
      <el-card class="box-card" shadow="hover" style="width: 557px; height: 610px">
        <el-calendar v-model="selectDate">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template v-slot:dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
            </p>
            <!-- <p>{{ typeof(data.day) }}</p> -->
            <p v-if="calendarInfo[data.day]">{{ calendarInfo[data.day] }}</p>
            <p v-else>未打卡</p>
          </template>
        </el-calendar>
      </el-card>

      <el-card class="detail-card" shadow="hover" style="width: 557px; height: 610px">
        <h2>打卡详情</h2>
        <h3>打卡时间：{{ detailInfo.clockTime }}</h3>
        <h3>任务名称：{{ detailInfo.taskName }}</h3>
        <h3>备注信息：{{ detailInfo.remark }}</h3>
      </el-card>
    </div>

    <PageModal
      ref="pageModalRef"
      v-bind:isCheckIn="true"
      :modalConfig="modalConfig"
      :defaultInfo="formData"
      :handleType="handleType"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
/* 组件 */
// import PageCard from '@/components/content/pageCard';
import PageModal from '@/components/content/pageModal';
/* 配置 */
import { formatUtcTime } from '@/utils/timeFormat';
import { myRequest } from '@/service';
import { mapDataToOptions } from './utils';
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { modalConfig } from './config/modal';
export default {
  name: 'workCheckIn',
  data() {
    return {
      selectDate: '',
      isCheckIn: true,
      imageUrlTrue: 'https://cloud.ilikestudy.cn//Typora25871649930952_.pic.jpg',
      imageUrlFalse: 'https://cloud.ilikestudy.cn//Typora25841649930874_.pic.jpg',
      loginUserId: 1,
      calendarInfo: {},
      detailInfo: {},
    };
  },
  created() {
    this.loginUserId = this.$store.state.loginUser.id;
    this.getCheckInStatus();
    this.getAllClock();
    this.getTaskList();
  },
  components: {
    PageModal,
  },
  watch: {
    selectDate(newVal) {
      console.log(formatUtcTime(newVal));
      myRequest
        .get(`/employee/getClockDetail/${this.loginUserId}/${formatUtcTime(newVal)}`)
        .then((res) => {
          this.detailInfo = res.data;
          console.log(this.detailInfo);
        });
    },
  },
  mixins: [handleContentMixin],
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    handleView() {
      if (!this.isCheckIn) {
        this.$message.error('您已经过打卡了');
        return;
      }
      this.onView();
    },
    getTaskList() {
      myRequest.get(`/common/getTaskList`).then((res) => {
        modalConfig.formItems[0].options = mapDataToOptions(res.data);
      });
    },
    getCheckInStatus() {
      myRequest.get(`/employee/clockStatus/${this.loginUserId}`).then((res) => {
        this.isCheckIn = res.data;
      });
      this.getAllClock();
    },
    getAllClock() {
      myRequest.get(`/employee/getAllClock/${this.loginUserId}`).then((res) => {
        this.calendarInfo = res.data;
      });
    },
    handleConfirm(data) {
      myRequest.post(`/employee/clockIn`, { ...data, userId: this.loginUserId }).then((res) => {
        console.log(res);
        this.getCheckInStatus();
      });
    },
  },
};
// components: { PageCard },
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.el-card {
  display: inline-block;
  overflow: scroll;
}
.detail-card {
  margin-left: 20px;
  width: 350px !important;
}
</style>
