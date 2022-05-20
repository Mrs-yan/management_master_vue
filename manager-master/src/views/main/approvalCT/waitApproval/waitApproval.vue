<template>
  <div>
    <page-content
      :contentConfig="contentConfig"
      :dataList="dataList"
      :isShowAdmir="true"
      :isShowRefuse="true"
      ref="pageContentRef"
      @onAdmir="handleAdmir"
      @onRefuse="handleRefuse"
      @onCurrentChange="handleCurrentChange"
    />
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="formData"
      :handleType="handleType"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
/* 组件 */
import PageContent from '@/components/content/pageContent';
import PageModal from '@/components/content/pageModal';
/* 配置 */
import { myRequest } from '@/service';
import { handleContentMixin } from '@/mixin/handleContentMixin';
import { contentConfig } from './config/content';
import { modalConfig } from './config/modal';
/* mixin */
// import { handleContentMixin } from "@/mixin/handleContentMixin";
export default {
  name: 'waitApproval',
  data() {
    return {
      dataList: [],
      formData: {},
      page: 1,
    };
  },
  mixins: [handleContentMixin],
  components: { PageContent, PageModal },
  created() {
    this.getPendList();
  },
  mounted() {},
  computed: {
    modalConfig() {
      return modalConfig;
    },
    contentConfig() {
      return contentConfig;
    },
  },
  methods: {
    getPendList() {
      myRequest.get(`/approval/getPendList/${this.page}/6`).then((res) => {
        this.dataList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      this.getPendList();
    },
    handleAdmir(id) {
      myRequest
        .get(`/approval/operationApply/${id}/1/${this.$store.state.loginUser.id}`)
        .then((res) => {
          console.log(res);
          this.$message.success('确认审批成功');
          this.getPendList();
        });
    },
    handleRefuse(id) {
      myRequest
        .get(`/approval/operationApply/${id}/2/${this.$store.state.loginUser.id}`)
        .then((res) => {
          console.log(res);
          this.$message.success('拒绝审批成功');
          this.getPendList();
        });
    },
    handleConfirm() {
      console.log('handleConfirm');
    },
  },
};
</script>

<style scoped lang="less">
</style>

