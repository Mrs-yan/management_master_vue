<template>
  <div>
    <div class="pick">
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>

    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>累计收入</h3>
        <h3>¥{{ data.totalRevenue }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>累计支出</h3>
        <h3>¥{{ data.totalSpend }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>累计利润</h3>
        <h3>¥{{ data.totalProfits }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>员工因公支出</h3>
        <h3>¥{{ data.businessSpend }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>员工个人预支</h3>
        <h3>¥{{ data.taskSpend }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
    <div class="card">
      <el-card
        class="[]"
        :body-style="{
          display: 'flex',
          'justify-content': 'space-around',
          'align-items': 'center',
        }"
      >
        <h3>审批未通过</h3>
        <h3>¥{{ data.approvalFail }}</h3>
        <!-- <img :src="imageUrl" class="image" /> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import { myRequest } from '@/service';
export default {
  name: 'financialSm',
  data() {
    return {
      data: {},
      value1: ['2022-03-20 00:00:00', '2022-05-20 00:00:00'],
    };
  },
  created() {
    this.getFinancialData();
  },
  mounted() {},
  methods: {
    handleSearch() {
      this.getFinancialData();
    },
    getFinancialData() {
      myRequest({
        url: '/financial/getFinancialData',
        method: 'post',
        data: {
          startTime: this.value1[0],
          endTime: this.value1[1],
        },
      }).then((res) => {
        this.data = res.data;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pick {
  display: flex;
  justify-content: center;
  .el-button {
    margin-left: 20px;
  }
}
.card {
  width: 360px;
  height: 250px;
  display: inline-block;
  margin: 30px;
  /* &:nth-child(3n) {
    margin-right: 0;
  } */
}
</style>

