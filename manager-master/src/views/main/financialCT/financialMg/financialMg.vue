<template>
  <div>
    <div class="button">
      <el-button type="primary" @click="handleZhiChu">添加收入</el-button>
      <el-button type="primary" plain @click="handleShouRu">添加支出</el-button>
    </div>
    <PageModal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      :defaultInfo="formData"
      :handleType="handleType"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
/* 组件 */
import PageModal from '@/components/content/pageModal';
/* 配置 */
import { myRequest } from '@/service';
import { mapDataToOptions } from './utils';
/* 配置 */
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { modalConfig } from './config/modal';
export default {
  name: 'financialMg',
  data() {
    return {
      formData: {},
    };
  },
  mixins: [handleContentMixin],
  components: { PageModal },
  created() {
    this.getAllTask();
  },
  computed: {
    modalConfig() {
      return modalConfig;
    },
  },
  methods: {
    getAllTask() {
      myRequest('/common/getTaskList').then((res) => {
        modalConfig.formItems[2].options = mapDataToOptions(res.data);
        console.log(modalConfig);
      });
    },
    handleZhiChu() {
      this.onCreate();
    },
    handleShouRu() {
      this.onCreate();
    },
    handleConfirm(data) {
      myRequest
        .post('financial/addFinancial', { createBy: this.$store.state.loginUser.name, ...data })
        .then(() => {
          this.$message.success('添加成功');
        });
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>

