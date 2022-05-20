<template>
  <div>
    <page-content
      :contentConfig="contentConfig"
      :dataList="dataList"
      :isShowDelete="true"
      ref="pageContentRef"
      @onDelect="handleDelect"
      @onCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>
/* 组件 */
import PageContent from '@/components/content/pageContent';
/* 配置 */
import { myRequest } from '@/service';
import { contentConfig } from './config/content';
/* mixin */
// import { handleContentMixin } from "@/mixin/handleContentMixin";
export default {
  name: 'financiallist',
  data() {
    return {
      dataList: [],
      formData: {},
      page: 1,
    };
  },
  components: { PageContent },
  created() {
    this.getfinancialList();
  },
  mounted() {},
  computed: {
    contentConfig() {
      return contentConfig;
    },
  },
  methods: {
    getfinancialList() {
      myRequest.get(`/financial/getFinancialList/${this.page}/6`).then((res) => {
        this.dataList = res.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      this.getfinancialList();
    },
    handleDelect(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          myRequest.delete(`/financial/deleteFinancial/${id}`).then(() => {
            this.$message.success('删除成功');
            this.getfinancialList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
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

