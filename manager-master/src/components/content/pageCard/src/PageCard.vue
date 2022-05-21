<template>
  <div class="card">
    <el-card
      class="[]"
      :body-style="{
        display: 'flex',
        'justify-content': 'space-around',
        'align-items': 'center',
        'background-color': bgColor,
      }"
    >
      <div>
        <div v-if="status">状态：{{ realStatus }}</div>
        <div v-if="eqStatus">状态：{{ realEqStatus }}</div>
        <div>名称：{{ name }}</div>
        <div v-if="model">型号：{{ model }}</div>
        <div v-if="workNumber">工号：{{ workNumber }}</div>
        <div v-if="createBy">负责人：{{ createBy }}</div>
        <div v-if="telephoneNumber">电话：{{ telephoneNumber }}</div>
        <div v-if="sex">性别：{{ sex }}</div>
        <div v-if="idCardNumber">身份证号码：{{ idCardNumber }}</div>
        <div class="bottom clearfix">
          <el-button type="primary" size="mini" class="button" @click="handleView">查看/编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            class="button"
            @click="handleDelect"
            v-if="this.$store.getters.isAdmin"
          >删除</el-button
          >
        </div>
      </div>

      <div class="image">
        <el-image
          v-if="imageUrl"
          style="width: 100px; height: 100px"
          :src="imageUrl"
          :preview-src-list="[imageUrl]"
        >
        </el-image>
      </div>
      <!-- <img :src="imageUrl" class="image" /> -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    workNumber: {
      type: String,
      default: '',
    },
    createBy: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 0,
    },
    eqStatus: {
      type: Number,
      default: 0,
    },
    telephoneNumber: {
      type: String,
      default: '',
    },
    sex: {
      type: String,
      default: '',
    },
    idCardNumber: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleView() {
      // console.log(this.id);
      this.$emit('view', this.id);
    },
    handleDelect() {
      this.$emit('delect', this.id);
    },
  },
  computed: {
    bgColor() {
      if (this.status === 3) {
        return 'gray';
      } else if (this.status === 2) {
        return '#d8f6f2';
      } else if (this.status === 1 || this.eqStatus === 1) {
        return '#9fbc50';
      } else {
        return '#fff';
      }
    },
    //任务状态
    realStatus() {
      if (this.status === 3) {
        return '已完成';
      } else if (this.status === 2) {
        return '未开始';
      } else {
        return '进行中';
      }
    },
    //设备状态
    realEqStatus() {
      if (this.eqStatus === 1) {
        return '工作中';
      } else {
        return '空闲';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .box-card {
  background: aliceblue;
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
.bottom {
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  margin-left: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
