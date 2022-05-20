<template>
  <div>
    <div class="main">
      <chh-form v-bind="modalConfig" :formData="formData" @onChangeValue="onChangeValue">
      </chh-form>
      <el-button type="primary" @click="handleConfirm">提交申请</el-button>
    </div>
  </div>
</template>

<script>
/* 组件 */
// import PageModal from '@/components/content/pageModal';
// 组件
import ChhForm from '@/components/common/form';
/* 配置 */
import { myRequest } from '@/service';
import { mapDataToOptions } from './utils';
import { modalConfig } from './config/modal';
export default {
  name: 'spendingApply',
  data() {
    return {
      numberkey: 0,
      dataList: [],
      formData: {},
      page: 1,
      handleType: '',
    };
  },
  components: { ChhForm },
  created() {
    this.getAllTask();
  },
  computed: {
    modalConfig() {
      console.log(modalConfig);

      return modalConfig;
    },
  },
  methods: {
    getAllTask() {
      myRequest('/common/getTaskList').then((res) => {
        modalConfig.formItems[2].options = mapDataToOptions(res.data);
        this.$forceUpdate();
      });
    },
    handleConfirm() {
      // console.log(...this.formData);
      // console.log(this.$store.state.loginUser.id);
      myRequest
        .post('/approval/submitApplication', {
          proposerId: this.$store.state.loginUser.id,
          ...this.formData,
        })
        .then(() => {
          this.$message.success('提交成功');
          this.$refs.pageModalRef.closeModal();
        });
    },
    onChangeValue(formData) {
      console.log('onChangeValue');
      console.log(formData);
      this.formData = formData;
    },
  },
  mounted() {
    // this.$refs.pageModalRef.showDialog = true;
    // this.handleType = 'create';
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center !important;
}
.chh-form {
  position: relative;
  margin-left: -270px;
}
</style>
